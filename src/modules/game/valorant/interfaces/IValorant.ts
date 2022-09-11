/**
 * A interface representing valorant properties
 *
 * @author  Devitrax
 * @version 1.0 03/08/22
 */
export interface IValorant {
  name: string
  tag: string
  region: string
}

export interface ICurrentData {
  currenttier: number
  currenttierpatched: string
  ranking_in_tier: number
  mmr_change_to_last_game: number
  elo: number
  games_needed_for_rating: number
  old: boolean
}

export interface IMMRHistory {
  name: string
  tag: string
  data: IMMRMatch[]
}

export interface IMMRMatch {
  currenttier: number
  currenttierpatched: string
  ranking_in_tier: number
  mmr_change_to_last_game: number
  elo: number
  date: string
  date_raw: number
}

export interface IActRankWins {
  patched_tier: string
  tier: number
}

export interface IEpisodeActData {
  wins: number
  number_of_games: number
  final_rank: number
  final_rank_patched: string
  act_rank_wins: IActRankWins[]
  old: false
  error: string
}

export interface IBySeason {
  e5a3: IEpisodeActData
  e5a2: IEpisodeActData
  e5a1: IEpisodeActData
  e4a3: IEpisodeActData
  e4a2: IEpisodeActData
  e4a1: IEpisodeActData
  e3a3: IEpisodeActData
  e3a2: IEpisodeActData
  e3a1: IEpisodeActData
  e2a3: IEpisodeActData
  e2a2: IEpisodeActData
  e2a1: IEpisodeActData
  e1a3: IEpisodeActData
  e1a2: IEpisodeActData
  e1a1: IEpisodeActData
}

export interface IMMR {
  name: string
  tag: string
  puuid: string
  current_data: ICurrentData
  by_season: IBySeason
}

export interface IMatches {
  data: IMatch[]
}

export interface IMatch {
  metadata: IMetadata
  players: IPlayers
  teams: ITeams
  rounds: IRounds[]
  kills: IKills[]
}

export interface IMetadata {
  map: string
  game_version: string
  game_length: number
  game_start: number
  game_start_patched: string
  rounds_played: number
  mode: string
  queue: string
  season_id: string
  platform: string
  matchid: string
  region: string
  cluster: string
}

export interface IPlayers {
  all_players: IPlayer[]
  red: IPlayer[]
  blue: IPlayer[]
}

export interface ISessionPlaytime {
  minutes: number
  seconds: number
  milliseconds: number
}

export interface IBehavior {
  afk_rounds: number
  friendly_fire: IFriendlyFire
  rounds_in_spawn: number
}

export interface IFriendlyFire {
  incoming: number
  outgoing: number
}

export interface IPlatform {
  type: string
  os: IOS
}

export interface IOS {
  name: string
  version: string
}

export interface IAbilityCasts {
  c_casts: number | null
  q_casts: number | null
  e_cast: number | null
  x_cast: number | null
}

export interface IAssets {
  card: ICard
  agent: IAgent
}

export interface ICard {
  small: string
  large: string
  wide: string
}

export interface IAgent {
  small: string
  bust: string
  full: string
  killfeed: string
}

export interface IStats {
  score: number
  kills: number
  deaths: number
  assists: number
  bodyshots: number
  headshots: number
  legshots: number
  mostkills: number
  mostdeaths: number
  mostassists: number
  currenttier: number
  currenttier_patched: string
}
export interface IEconomy {
  spent: ISpent
  loadout_value: ILoadoutValue
}

export interface ISpent {
  overall: number
  average: number
}

export interface ILoadoutValue {
  overall: number
  average: number
}

export interface IPlayer {
  puuid: string
  name: string
  tag: string
  team: string
  level: number
  character: string
  currenttier: number
  currenttier_patched: string
  player_card: string
  player_title: string
  party_id: string
  session_playtime: ISessionPlaytime
  behavior: IBehavior
  platform: IPlatform
  ability_casts: IAbilityCasts
  assets: IAssets
  stats: IStats
  economy: IEconomy
  damage_made: number
  damage_received: number
  player_info: IPlayerInfo | undefined
}

export interface IPlayerInfo {
  matches: number
  team: ITeam
}

export interface ITeams {
  red: ITeam
  blue: ITeam
}

export interface ITeam {
  has_won: boolean
  rounds_won: number
  rounds_lost: number
}

export interface IPlantLocation {
  x: number
  y: number
}

export interface IPlantedBy {
  puuid: string
  display_name: string
  team: string
}

export interface ILocation {
  x: number
  y: number
}

export interface IPlayerLocationsOnPlant {
  player_puuid: string
  player_display_name: string
  player_team: string
  location: ILocation
  view_radians: number
}

export interface IPlantEvents {
  plant_location: IPlantLocation
  planted_by: IPlantedBy
  plant_site: string
  plant_time_in_round: number
  player_locations_on_plant: IPlayerLocationsOnPlant[]
}

export interface IDefuseLocation {
  x: number
  y: number
}

export interface IDefusedBy {
  puuid: string
  display_name: string
  team: string
}

export interface IPlayerLocationsOnDefuse {
  player_puuid: string
  player_display_name: string
  player_team: string
  location: ILocation
  view_radians: number
}

export interface IDefuseEvents {
  defuse_location: IDefuseLocation
  defused_by: IDefusedBy
  defuse_time_in_round: number
  player_locations_on_defuse: IPlayerLocationsOnDefuse
}

export interface IRounds {
  winning_team: string
  end_type: string
  bomb_planted: boolean
  bomb_defused: boolean
  plant_events: IPlantEvents
  defuse_events: IDefuseEvents
}

export interface IDamageEvents {
  receiver_puuid: string
  receiver_display_name: string
  receiver_team: string
  bodyshots: number
  damage: number
  headshots: number
  legshots: number
}

export interface IVictimDeathLocation {
  x: number
  y: number
}

export interface IDamageWeaponAssets {
  display_icon: string
  killfeed_icon: string
}

export interface IPlayerLocationsOnKill {
  player_puuid: string
  player_display_name: string
  player_team: string
  location: ILocation
  view_radians: number
}

export interface IAssistants {
  assistant_puuid: string
  assistant_display_name: string
  assistant_team: string
}

export interface IKillEvents {
  kill_time_in_round: number
  kill_time_in_match: number
  killer_puuid: string
  killer_display_name: string
  killer_team: string
  victim_puuid: string
  victim_display_name: string
  victim_team: string
  victim_death_location: IVictimDeathLocation
  damage_weapon_id: string
  damage_weapon_name: string
  damage_weapon_assets: IDamageWeaponAssets
  secondary_fire_mode: boolean
  player_locations_on_kill: IPlayerLocationsOnKill[]
  assistants: IAssistants[]
}

export interface IWeaponAssets {
  display_icon: string
  killfeed_icon: string
}

export interface IWeapon {
  id: string
  name: string
  assets: IWeaponAssets
}

export interface IArmorAssets {
  display_icon: string
}

export interface IArmor {
  id: string
  name: string
  assets: IArmorAssets
}

export interface IKillEconomy {
  loadout_value: number
  weapon: IWeapon
  armor: IArmor
  remaining: number
  spent: number
}

export interface IKills {
  ability_casts: IAbilityCasts
  player_puuid: string
  player_display_name: string
  player_team: string
  damage_events: IDamageEvents[]
  damage: number
  bodyshots: number
  headshots: number
  legshots: number
  kill_events: IKillEvents[]
  kills: number
  score: number
  economy: IKillEconomy
  was_afk: boolean
  was_penalized: boolean
  stayed_in_spawn: boolean
}