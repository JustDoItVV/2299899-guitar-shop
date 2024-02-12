import { CliParsedCommand } from '@guitar-shop/types';

export class CommandParser {
  static parse(cliArguments: string[]): CliParsedCommand {
    let currentCommand = '';

    return cliArguments.slice(2).reduce(
      (parsedCommand: CliParsedCommand, argument) => {
        {
          currentCommand = argument.startsWith('--') ? argument : currentCommand;

          return {
            ...parsedCommand,
            [currentCommand]: parsedCommand[currentCommand] ? [...parsedCommand[currentCommand], argument] : [],
          };
        }
      },
      {}
    );
  }
}
