import mongoose from 'mongoose'

//Create the game schema
const gameSchema = new mongoose.Schema(
    {
        Date: { // Match Date (dd/mm/yy)
            type: String,
            required: true,
        },
        HomeTeam: { //Home Team
            type: String,
            required: true,
            trim: true,
        }, 
        AwayTeam: { //Away Team
            type: String,
            required: true,
            trim: true,
        },
        FTHG: { //Full Time Home Team Goals
            type: Number,
            required: true
        },
        FTAG: { //Full Time Away Team Goals
            type: Number,
            required: true
        },
        FTR: { //Full Time Result (H=Home Win, D=Draw, A=Away Win)
            type: String,
            required: true
        },
        HTHG: Number, //Half Time Home Team Goals
        HTAG: Number, //Half Time Away Team Goals
        HTR: String, //Half Time Result (H=Home Win, D=Draw, A=Away Win)
        Referee: String, //Match Referee
        div: String, //League Division
        HS: Number, //Home Team Shots
        AS: Number, //Away Team Shots
        HST: Number, //Home Team Shots on Target
        AST: Number, //Away Team Shots on Target
        HF: Number, //Home Team Fouls Committed
        AF: Number, //Away Team Fouls Committed
        HC: Number, //Home Team Corners
        AC: Number, //Away Team Corners
        HY: Number, //Home Team Yellow Cards
        AY: Number, //Away Team Yellow Cards
        HR: Number, //Home Team Red Cards
        AR: Number, //Away Team Red Cards
        B365H: Number, //Bet365 home win odds
        B365D: Number, //Bet365 draw odds
        B365A: Number, //Bet365 away win odds
        BWH: Number, //Bet&Win home win odds
        BWD: Number, //Bet&Win draw odds
        BWA: Number, //Bet&Win away win odds
        IWH: Number, //Interwetten home win odds
        IWD: Number, //Interwetten draw odds
        IWA: Number, //Interwetten away win odds
        PSH: Number, //Pinnacle home win odds
        PSD: Number, //Pinnacle draw odds
        PSA: Number, //Pinnacle away win odds
        WHH: Number, //William Hill home win odds
        WHD: Number, //William Hill draw odds
        WHA: Number, //William Hill away win odds
        VCH: Number, //VC Bet home win odds
        VCD: Number, //VC Bet draw odds
        VCA: Number, //VC Bet away win odds
        Bb1X2: Number, //Number of BetBrain bookmakers used to calculate match odds averages and maximums
        BbMxH: Number, //Betbrain maximum home win odds
        BbAvH: Number, //Betbrain average home win odds
        BbMxD: Number, //Betbrain maximum draw odds
        BbAvD: Number, //Betbrain average draw win odds
        BbMxA: Number, //Betbrain maximum away win odds
        BbAvA: Number, //Betbrain average away win odds
        BbOU: Number, //Number of BetBrain bookmakers used to calculate over/under 2.5 goals (total goals) averages and maximums
        BbMxg25: Number, //BbMxg25: BbMx>2.5 = Betbrain maximum over 2.5 goals
        BbAvg25: Number, //BbAvg25: BbAv>2.5 = Betbrain average over 2.5 goals
        BbMxl25: Number, //BbMxl25: BbMx<2.5 = Betbrain maximum under 2.5 goals
        BbAvl25: Number, //BbAvl25: BbAv<2.5 = Betbrain average under 2.5 goals
        BbAH: Number, //Number of BetBrain bookmakers used to Asian handicap averages and maximums
        BbAHh: Number, //Betbrain size of handicap (home team)
        BbMxAHH: Number, //Betbrain maximum Asian handicap home team odds
        BbAvAHH: Number, //Betbrain average Asian handicap home team odds
        BbMxAHA: Number, //Betbrain maximum Asian handicap away team odds
        BbAvAHA: Number, //Betbrain average Asian handicap away team odds
        PSCH: Number, //
        PSCD: Number, //
        PSCA: Number, //
        GBH: Number, //Gamebookers home win odds
        GBD: Number, //Gamebookers draw odds
        GBA: Number, //Gamebookers away win odds
        LBH: Number, //Ladbrokes home win odds
        LBD: Number, //Ladbrokes draw odds
        LBA: Number, //Ladbrokes away win odds
        SBH: Number, //Sportingbet home win odds
        SBD: Number, //Sportingbet draw odds
        SBA: Number, //Sportingbet away win odds
        SJH: Number, //Stan James home win odds
        SJD: Number, //Stan James draw odds
        SJA: Number, //Stan James away win odds
        BSH: Number, //Blue Square home win odds
        BSD: Number, //Blue Square draw odds
        BSA: Number, //Blue Square away win odds
        league: { //League of country
            type: String,
            required: true
        },
        season: { //Season period
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
        collection: 'Game',
    }
);

//Create, instantiate and export model with schema
const Game = mongoose.model("Game", gameSchema);
export default Game;
