import { genSalt, hash } from 'bcrypt';
import chalk from 'chalk';
import * as crypto from 'node:crypto';
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

import { CliCommand } from '@guitar-shop/types';
// import { CliConfig } from '@guitar-shop/config';
// import { CliCommand, Guitar, GuitarType } from '@guitar-shop/types';
import { PrismaClient } from '@prisma/client';

// import { GuitarType } from '@project/types';
import {
  DEFAULT_USER,
  GUITAR_STRINGS,
  MOCK_PRICE,
  SALT_ROUNDS,
} from '../const';
import { getErrorMessage } from './utils';

export interface Guitar {
  id?: string;
  title: string;
  description: string;
  photo: string;
  type: GuitarType;
  vendorCode: string;
  guitarStrings: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum GuitarType {
  Electro = 'электро',
  Accustic = 'аккустика',
  Ukulele = 'укулеле',
}

const FRONTEND_IMG_DIRECTORY = 'apps/frontend/public/img/content';

export class GenerateCommand implements CliCommand {
  private readonly name = '--generate';
  // private readonly cliConfig = CliConfig;

  private generateMockData(n: number) {
    const mockData: Guitar[] = [];
    const guitarTypes = Object.values(GuitarType);

    for (let i = 0; i < n; i++) {
      const fileName = `catalog-product-${Math.floor(
        Math.random() * (i % 9)
      )}@2x.png`;
      const photoName = `${crypto.randomUUID()}-${fileName}`;

      copyFileSync(
        join(FRONTEND_IMG_DIRECTORY, fileName),
        join('uploads/guitar', photoName)
      );

      mockData.push({
        title: `Title ${i}`,
        description: `Description ${i}`,
        photo: photoName,
        type: guitarTypes[Math.floor(Math.random() * guitarTypes.length)],
        vendorCode: crypto.randomUUID(),
        guitarStrings:
          GUITAR_STRINGS[Math.floor(Math.random() * GUITAR_STRINGS.length)],
        price: MOCK_PRICE + MOCK_PRICE * i,
      });
    }

    return mockData;
  }

  private async seedDb(
    prismaClient: PrismaClient,
    data: Guitar[]
  ): Promise<void> {
    // const defaultUser = this.cliConfig().defaultUser;
    let user = await prismaClient.user.findFirst({
      where: { email: DEFAULT_USER.email },
    });

    if (!user) {
      const salt = await genSalt(SALT_ROUNDS);
      const mockData = {
        ...DEFAULT_USER,
        passwordHash: await hash(DEFAULT_USER.password, salt),
      };
      delete mockData.password;
      user = await prismaClient.user.create({ data: mockData });
    }

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
    const prismaClient = new PrismaClient({
      datasources: { db: { url: connectionString } },
    });

    try {
      if (!n || n.length === 0) {
        throw new Error('No <n> argument');
      }

      if (!connectionString || connectionString.length === 0) {
        throw new Error('No <connection string> argument');
      }

      const mockRecordsCount = Number.parseInt(n, 10);
      const mockData = this.generateMockData(mockRecordsCount);

      await this.seedDb(prismaClient, mockData);
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
