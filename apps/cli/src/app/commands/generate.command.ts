import chalk from 'chalk';

import { CliCommand } from '@guitar-shop/types';

import { getErrorMessage } from './utils';

export class GenerateCommand implements CliCommand {
  private readonly name = '--generate';

  private generateMockData() {
    console.log('Not implemented');
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

      const mockRecordsCount = Number.parseInt(n, 10);

      this.generateMockData();
      console.info(chalk.green(`Database filled with ${mockRecordsCount} records!`));
    } catch (error) {
      console.error(chalk.red('Can\'t generate data'));
      console.error(chalk.red(`Details: ${getErrorMessage(error)}`));
    }
  }
}
