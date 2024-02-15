import { genSalt, hash } from 'bcrypt';
import chalk from 'chalk';
import * as crypto from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { faker } from '@faker-js/faker';
import { CliConfig } from '@guitar-shop/config';
import {
  FRONTEND_IMG_DIRECTORY,
  GUITAR_STRINGS,
  Price,
  SALT_ROUNDS,
  UPLOAD_GUITARS_SUBDIRECTORY,
} from '@guitar-shop/consts';
import { CliCommand, Guitar, GuitarType, User } from '@guitar-shop/types';
import { PrismaClient } from '@prisma/client';

import { getErrorMessage } from './utils';

export class GenerateCommand implements CliCommand {
  private readonly name = '--generate';
  private readonly cliConfig = CliConfig;

  private generateMockData(n: number, user: User) {
    const mockData: Guitar[] = [];
    const guitarTypes = Object.values(GuitarType);

    for (let i = 0; i < n; i++) {
      const fileName = `catalog-product-${Math.floor(
        Math.random() * (i % 9)
      )}@2x.png`;
      const photoName = `${crypto.randomUUID()}-${fileName}`;

      const uploadDirectory = join(
        this.cliConfig().uploadDirectory,
        UPLOAD_GUITARS_SUBDIRECTORY
      );
      if (!existsSync(uploadDirectory)) {
        mkdirSync(uploadDirectory, {
          recursive: true,
        });
      }

      copyFileSync(
        join(FRONTEND_IMG_DIRECTORY, fileName),
        join(
          this.cliConfig().uploadDirectory,
          UPLOAD_GUITARS_SUBDIRECTORY,
          photoName
        )
      );

      mockData.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        photo: photoName,
        type: guitarTypes[Math.floor(Math.random() * guitarTypes.length)],
        vendorCode: crypto.randomUUID(),
        guitarStrings:
          GUITAR_STRINGS[Math.floor(Math.random() * GUITAR_STRINGS.length)],
        price: parseInt(
          faker.commerce.price({ min: Price.Min, max: Price.Max }),
          10
        ),
        userId: user.id,
      });
    }

    return mockData;
  }

  private async seedDb(
    prismaClient: PrismaClient,
    mockRecordsCount: number
  ): Promise<void> {
    const defaultUser = this.cliConfig().defaultUser;
    let user = await prismaClient.user.findFirst({
      where: { email: defaultUser.email },
    });

    if (!user) {
      const salt = await genSalt(SALT_ROUNDS);
      const mockData = {
        ...defaultUser,
        passwordHash: await hash(defaultUser.password, salt),
      };
      delete mockData.password;
      user = await prismaClient.user.create({ data: mockData });
    }

    const data = this.generateMockData(mockRecordsCount, user);

    for (const record of data) {
      await prismaClient.guitar.create({
        data: {
          ...record,
          userId: user.id,
        },
      });
    }

    console.info(
      chalk.green(`🤘️ Database filled with ${data.length} records!`)
    );
  }

  public getName(): string {
    return this.name;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [n, connectionString] = parameters;

    try {
      if (!n || n.length === 0) {
        throw new Error('No <n> argument');
      }

      if (!connectionString || connectionString.length === 0) {
        throw new Error('No <connection string> argument');
      }
    } catch (error) {
      console.error(chalk.red("Can't generate data"));
      console.error(chalk.red(`Details: ${getErrorMessage(error)}`));
      globalThis.process.exit(1);
    }

    const prismaClient = new PrismaClient({
      datasources: { db: { url: connectionString } },
    });

    try {
      const mockRecordsCount = Number.parseInt(n, 10);
      await this.seedDb(prismaClient, mockRecordsCount);
      globalThis.process.exit(0);
    } catch (error) {
      console.error(chalk.red("Can't generate data"));
      console.error(chalk.red(`Details: ${getErrorMessage(error)}`));
      globalThis.process.exit(1);
    } finally {
      await prismaClient.$disconnect();
    }
  }
}
