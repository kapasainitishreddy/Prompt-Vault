export type Palette={bg:string;surface:string;elevated:string;text:string;sub:string;border:string;accent:string;accentText:string;faint:string;danger:string};
export const themes:Record<"light"|"dark",Palette>={
light:{bg:"#F6F4EE",surface:"#FFFFFF",elevated:"#EEF1E7",text:"#192920",sub:"#526459",border:"#B2BDB3",accent:"#254C3D",accentText:"#FFFFFF",faint:"#E6EEE5",danger:"#A63331"},
dark:{bg:"#101A16",surface:"#1C2923",elevated:"#283A31",text:"#F6F6EE",sub:"#B9CABC",border:"#587264",accent:"#D1E49D",accentText:"#162A1F",faint:"#344B3C",danger:"#FF9E92"}};
