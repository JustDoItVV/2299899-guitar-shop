import { CliCommand, CliCommandsCollection } from '@guitar-shop/types';

import { CommandParser } from './command-parser';

export class CliApplication {
  private commands: CliCommandsCollection = {};
  private readonly defaultCommand = '--help';

  public registerCommands(commandList: CliCommand[]): void {
    commandList.forEach((command) => {
      if (this.commands[command.getName()]) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }

      this.commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): CliCommand {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): CliCommand | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered`);
    }

    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
