/**
 * A interface representing the embed builder properties
 *
 * @author  Devitrax
 * @version 1.0 03/08/22
 */

import { AttachmentBuilder, CacheType, Channel, CommandInteraction, MessageActionRowComponentData, SelectMenuInteraction } from "discord.js";

export interface IBuilder {
  interaction: CommandInteraction | SelectMenuInteraction<CacheType> | Channel | null
}

export interface IMessage {
  files?: AttachmentBuilder
  components?: MessageActionRowComponentData;
}