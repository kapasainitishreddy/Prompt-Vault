/**
 * Read-only MCP v2 server for original Prompt-Vault source catalog.
 * No AI model, remote API, paid service, credentials, writes or analytics.
 * Uses official SDK @modelcontextprotocol/server.
 */
import {McpServer} from "@modelcontextprotocol/server";
import {serveStdio} from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";
import {readFileSync} from "node:fs";
import {join,dirname} from "node:path";
import {fileURLToPath} from "node:url";
const root=dirname(dirname(fileURLToPath(import.meta.url)));
const readJSON=name=>JSON.parse(readFileSync(join(root,"docs","data",name),"utf8"));
const app=readJSON("app.json"),web=readJSON("website.json"),guides=readJSON("guided-apps.json");
const flows=app.flows,sections=web.sections,journeys=guides.blueprints;
const codeBase="https://github.com/kapasainitishreddy/Prompt-Vault/blob/main/";
const respond=value=>({content:[{type:"text",text:typeof value==="string"?value:JSON.stringify(value,null,2)}]});
const fail=value=>({isError:true,content:[{type:"text",text:value}]});
const findFlow=id=>flows.find(x=>x.id===id);
const findSection=id=>sections.find(x=>x.id===id);
function readPrompt(track,id){
 const known=(track==="app"?findFlow(id):findSection(id));
 if(!known)return null;
 const path=join(root,"prompts",track,track==="app"?"flows":"sections",id+".md");
 return readFileSync(path,"utf8");
}
function buildBrief({idea,journeyId,platform,style}){
 const j=journeys.find(x=>x.id===journeyId);
 if(!j)return null;
 const patternList=j.flows.map((id,i)=>{
  const f=findFlow(id);
  return String(i+1)+". "+(f?.title||id)+" ["+id+"] - "+(f?.job||"Confirm its user task");
 });
 return [
  "# Prompt-Vault mobile app build brief",
  "App idea: "+idea,
  "Category: "+j.title,
  "Platform: "+platform,
  "Visual direction: "+style,
  "Core user job: "+j.job,
  "",
  "## End-to-end screen order",
  ...patternList,
  "",
  "## Design instructions",
  "Generate three materially different native app design directions and select one based on the user job.",
  "Use consistent tokens, realistic copy, purpose-specific layouts, native Android/iOS conventions and accessible touch targets.",
  "Include meaningful loading, empty, error, success, offline, permission-denied and interrupted states, with recovery and undo.",
  "Do not invent product claims, testimonials, ratings, real user analytics or research results.",
  "",
  "## Implementation instructions",
  "Implement with Expo and TypeScript. Adapt native-kit components selectively, using version-compatible packages.",
  "Create typed navigation, data models and real persistence/integrations only when authorized and properly configured.",
  "Auth, payments, AI, notifications, capture/upload, syncing and data deletion are not provided by Prompt-Vault demos.",
  "",
  "## Release quality gate",
  "Verify TypeScript, behavior, accessibility, iOS and Android devices, focus, permissions, reduced motion, RTL and recovery.",
  "Report passing tests, screenshots and remaining blockers separately from unverified claims.",
  "Source: "+codeBase+"native-kit/App.tsx"
 ].join("\n");
}
serveStdio(()=>{
 const server=new McpServer({name:"prompt-vault-atlas",version:"0.1.0"});
 server.registerTool("search_app_patterns",{
   title:"Find mobile app UI patterns",description:"Search the 32 original app UX flow specifications by task, title or known failure state.",
   inputSchema:z.object({query:z.string().min(1).max(180),limit:z.number().int().min(1).max(32).optional()})
 },async({query,limit})=>{
   const q=query.toLowerCase().trim();const matched=flows.filter(f=>[f.id,f.title,f.job,f.behavior,f.states].join(" ").toLowerCase().includes(q));
   return respond({count:matched.length,patterns:matched.slice(0,limit??12).map(f=>({id:f.id,title:f.title,job:f.job,states:f.states,source:codeBase+"prompts/app/flows/"+f.id+".md"}))});
 });
 server.registerTool("get_app_pattern",{
   title:"Read mobile UI pattern",description:"Get the full pattern design rationale, variants, recovery states, QA expectations and optionally its authored prompt.",
   inputSchema:z.object({id:z.string().min(1).max(80),includePrompt:z.boolean().optional()})
 },async({id,includePrompt})=>{
   const f=findFlow(id);if(!f)return fail("Unknown app pattern. Use search_app_patterns first.");
   return respond({pattern:f,designPrompt:includePrompt?readPrompt("app",id):undefined,nativeDemo:codeBase+"native-kit/src/FlowScreen.tsx",source:codeBase+"prompts/app/flows/"+id+".md"});
 });
 server.registerTool("list_app_journeys",{
   title:"List connected mobile journeys",description:"Show all 20 guided app categories with ordered mobile screen IDs.",
   inputSchema:z.object({query:z.string().max(180).optional()})
 },async({query})=>{
   const q=(query||"").toLowerCase();
   return respond({count:journeys.length,journeys:journeys.filter(j=>(j.id+" "+j.title+" "+j.job+" "+j.category).toLowerCase().includes(q)).map(j=>({id:j.id,title:j.title,category:j.category,job:j.job,flows:j.flows}))});
 });
 server.registerTool("get_app_journey",{
   title:"Read end-to-end native app flow",description:"Get the ordered UX blueprint, screen goals, core user job, verification constraints and source prompt.",
   inputSchema:z.object({id:z.string().min(1).max(80)})
 },async({id})=>{
   const j=journeys.find(x=>x.id===id);
   if(!j)return fail("Unknown journey. Use list_app_journeys.");
   return respond({journey:j,orderedPatterns:j.flows.map(x=>findFlow(x)).filter(Boolean),nativeKit:codeBase+"native-kit/App.tsx"});
 });
 server.registerTool("compose_app_brief",{
   title:"Compose an implementation-ready mobile app brief",description:"Generate a deterministic, editable, research-linked build prompt for an app category; NO AI inference is used.",
   inputSchema:z.object({
     idea:z.string().min(10).max(1200),
     journeyId:z.string().min(1).max(80),
     platform:z.enum(["Android and iOS","Android first","iOS first"]),
     style:z.string().min(3).max(100)
   })
 },async(args)=>{
   const brief=buildBrief(args);
   return brief?respond(brief):fail("Unknown journey ID. Run list_app_journeys first.");
 });
 server.registerTool("search_website_sections",{
   title:"Find website UI sections",description:"Search the existing 32 website sections and get full source prompt references.",
   inputSchema:z.object({query:z.string().min(1).max(180),limit:z.number().int().min(1).max(32).optional()})
 },async({query,limit})=>{
   const q=query.toLowerCase().trim();
   const matched=sections.filter(s=>[s.id,s.title,s.job].join(" ").toLowerCase().includes(q));
   return respond({count:matched.length,sections:matched.slice(0,limit??12).map(s=>({id:s.id,title:s.title,job:s.job,prompt:codeBase+"prompts/website/sections/"+s.id+".md"}))});
 });
 server.registerTool("get_website_section",{
   title:"Read website section design guidance",description:"Get the full original website section spec and source prompt.",
   inputSchema:z.object({id:z.string().min(1).max(80),includePrompt:z.boolean().optional()})
 },async({id,includePrompt})=>{
   const s=findSection(id);if(!s)return fail("Unknown website section. Search first.");
   return respond({section:s,prompt:includePrompt?readPrompt("website",id):undefined,source:codeBase+"prompts/website/sections/"+id+".md"});
 });
 return server;
});
