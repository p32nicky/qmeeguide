import Groq from "groq-sdk";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import fs from "fs";
import path from "path";

let useGroq = true;
const AFFILIATE = "https://qm.ee/r/tMfRPSm60cA";

const ARTICLE_TOPICS = [
  // Core reviews
  "Qmee Review: Is It Legit and Worth Your Time?",
  "Qmee App Review: Honest Look at Earnings",
  "Is Qmee Legit? Full Investigation",
  "Qmee Reddit Reviews: What Real Users Say",
  "Qmee Trustpilot Reviews: Are They Accurate?",
  "How Much Can You Really Earn with Qmee?",
  "Qmee Pros and Cons: Complete Breakdown",
  "Qmee vs Swagbucks: Which Pays More?",
  "Qmee vs Survey Junkie: Which Is Better?",
  "Qmee vs InboxDollars: Full Comparison",
  "Qmee vs Toluna: Which Survey App Wins?",
  "Qmee vs YouGov: Best Survey Platform?",
  "Qmee vs PrizeRebel: Which Pays More?",
  "Qmee vs MyPoints: Comparison Guide",
  "Qmee vs Opinion Outpost: Which to Choose?",
  "Qmee vs Pinecone Research: Which Pays Better?",
  "Qmee vs LifePoints: Full Comparison",
  "Qmee vs Branded Surveys: Side by Side",
  "Qmee vs Google Opinion Rewards: Comparison",
  "Qmee Alternatives: Best Survey Apps Ranked",

  // Getting started
  "How to Sign Up for Qmee Step by Step",
  "Qmee Getting Started Guide: Everything You Need to Know",
  "How to Set Up Your Qmee Profile for More Surveys",
  "Qmee App Download: iOS and Android Guide",
  "How Does Qmee Work? Plain English Explanation",
  "Qmee Age Requirements: Who Can Use It?",
  "What Countries Is Qmee Available In?",
  "Qmee Requirements: Do You Qualify?",
  "Qmee for Beginners: First Steps to Earning",
  "Qmee Tips for New Users: Maximize from Day One",

  // Surveys
  "How to Get More Surveys on Qmee",
  "Why Am I Not Getting Surveys on Qmee?",
  "Qmee Survey Disqualification: Why It Happens and How to Avoid It",
  "How Long Do Qmee Surveys Take?",
  "Best Time to Take Qmee Surveys",
  "Qmee Survey Tips: Complete More, Earn More",
  "How Much Do Qmee Surveys Pay Per Hour?",
  "Qmee Survey Topics: What Kind of Surveys Are Available?",
  "Qmee Survey Length: What to Expect",
  "How to Answer Qmee Surveys Honestly and Quickly",
  "Qmee Survey Streak: How the 10% Bonus Works",
  "Qmee 15-Day Streak Bonus: How to Keep It Going",
  "How Many Surveys Can You Do Per Day on Qmee?",
  "Qmee Survey Screeners: What They Are and How to Pass",
  "Qmee Profiling Surveys: How They Help You Qualify",

  // Cashback
  "Qmee Cashback: How It Works",
  "Best Stores for Qmee Cashback",
  "How to Activate Qmee Cashback Deals",
  "Qmee Cashback vs Rakuten: Which Is Better?",
  "Qmee Cashback vs Honey: Which Saves More?",
  "Does Qmee Cashback Stack with Other Coupons?",
  "How Much Can You Earn with Qmee Cashback?",
  "Qmee Amazon Cashback: How to Use It",
  "Qmee Grocery Cashback: Save on Everyday Shopping",
  "Qmee Fashion Cashback: Best Clothing Stores",
  "Qmee Travel Cashback: Hotels and Flights",
  "Qmee Tech Cashback: Electronics Deals",
  "Qmee Cashback Browser Extension: How to Use It",
  "Qmee Cashback Tracking: When Does It Show Up?",
  "Qmee Cashback Missing: What to Do",

  // Gaming
  "Qmee Gaming: How to Earn Playing Games",
  "Best Games to Play on Qmee for Maximum Earnings",
  "How Much Can You Earn Gaming on Qmee?",
  "Qmee Gaming vs Survey Earnings: Which Is Better?",
  "Qmee Game Challenges: Tips for Completing Them",
  "Qmee Casual Games: Best Options for Quick Earnings",
  "Is Qmee Gaming Worth Your Time?",
  "Qmee Gaming Leaderboards: How They Work",
  "Qmee Gaming Rewards: Complete Guide",
  "Best Strategy for Qmee Gaming Earnings",

  // Cash out
  "How to Cash Out on Qmee",
  "Qmee PayPal Cash Out: Step by Step",
  "Qmee Venmo Cash Out: How It Works",
  "Qmee Gift Card Options: Full List",
  "Qmee Minimum Cash Out: Is There One?",
  "How Fast Does Qmee Pay?",
  "Qmee Payment Processing Time: What to Expect",
  "Qmee PayPal Issues: Common Problems and Fixes",
  "Qmee Charity Donations: How to Give Your Earnings",
  "Best Way to Cash Out on Qmee for Maximum Value",
  "Qmee Gift Card vs Cash: Which Is Worth More?",
  "Qmee Amazon Gift Card: How to Redeem",
  "Qmee Balance Not Showing: How to Fix",
  "Qmee Payment Pending: What Does It Mean?",
  "Qmee Tax: Do You Need to Report Earnings?",

  // Maximizing earnings
  "How to Maximize Earnings on Qmee",
  "Qmee Earning Strategies That Actually Work",
  "How to Make $50 a Month on Qmee",
  "Qmee Daily Earnings: Realistic Expectations",
  "Qmee Weekly Earnings: What's Achievable?",
  "Qmee Monthly Earnings: Real User Results",
  "Best Time of Day to Use Qmee for More Surveys",
  "Qmee Bonus Opportunities: Don't Miss These",
  "Qmee Referral Program: How to Earn More",
  "How to Refer Friends to Qmee for Extra Cash",
  "Qmee Profile Optimization: Get Targeted Surveys",
  "Qmee Notification Settings: Never Miss a Survey",
  "Qmee Streak Bonus: How to Never Break It",
  "Qmee Dashboard Tips: What to Check Daily",
  "Combining Qmee with Other Apps for Maximum Earnings",

  // Technical & account
  "Qmee App Not Working: Fixes for Common Issues",
  "Qmee Account Suspended: Why and What to Do",
  "Qmee Password Reset: Step by Step",
  "Qmee Customer Service: How to Get Help",
  "Qmee Account Verification: How It Works",
  "Qmee Privacy Policy: What Data Do They Collect?",
  "Is Qmee Safe? Data Security Review",
  "Qmee Cookies and Tracking: What You Should Know",
  "Qmee on Multiple Devices: Can You Use It?",
  "Qmee Desktop vs Mobile: Which Is Better?",
  "Qmee Survey Loading Issues: How to Fix",
  "Qmee Balance Disappeared: What Happened?",
  "How to Delete Qmee Account",
  "Qmee Update: What's New in the Latest Version",
  "Qmee Browser Extension Issues: Troubleshooting Guide",

  // Survey tips general
  "How to Make Money Taking Online Surveys",
  "Best Survey Sites That Actually Pay Real Money",
  "How Much Can You Make Taking Online Surveys?",
  "Online Survey Tips to Earn More Per Hour",
  "How to Avoid Survey Scams",
  "Best Paid Survey Apps for Smartphones",
  "How to Qualify for More Online Surveys",
  "Survey Disqualification: How to Minimize It",
  "Best Survey Sites for Beginners",
  "Survey Sites with No Minimum Cashout",
  "Highest Paying Survey Sites Ranked",
  "Survey Sites That Pay Instantly via PayPal",
  "Best Survey Sites for Students",
  "Best Survey Apps to Use in Spare Time",
  "How to Make $100 a Month with Online Surveys",
  "Survey Sites That Actually Pay: Legit List",
  "How Long Does It Take to Earn from Surveys?",
  "Best Surveys to Take on Lunch Break",
  "Survey Apps for Stay-at-Home Parents",
  "Online Surveys vs Gig Work: Which Pays More?",

  // Make money online general
  "Best Ways to Make Money Online from Home",
  "How to Make Extra Money in Your Spare Time",
  "Passive Income Apps That Actually Work",
  "Best Money-Making Apps for Smartphones",
  "How to Make $500 Extra Per Month Online",
  "Side Hustle Ideas That Require Zero Skills",
  "How to Make Money on Your Phone",
  "Best Apps to Earn Money Without Investment",
  "How to Earn Money Online as a Beginner",
  "Free Ways to Make Money Online",
  "How to Make Money in Your Downtime",
  "Apps That Pay You Real Money",
  "How to Make Money While Watching TV",
  "Best Micro-Earning Opportunities Online",
  "How to Turn Spare Time into Cash",
  "Online Income for People Who Hate Selling",
  "How to Make Money from Home Without a Job",
  "Legitimate Ways to Earn Cash Online",
  "How to Earn Gift Cards for Free Online",
  "Best Apps for Making Money on the Side",

  // Cashback general
  "Best Cashback Apps in the US",
  "How Cashback Apps Work: Complete Guide",
  "Best Cashback Sites for Online Shopping",
  "How to Stack Cashback Deals for Maximum Savings",
  "Cashback vs Coupons: Which Saves More?",
  "Best Grocery Cashback Apps",
  "How to Get Cashback on Amazon",
  "Best Cashback Credit Cards vs Apps",
  "Cashback Apps for Gas and Fuel",
  "How to Make Money Shopping with Cashback",
  "Best Cashback Apps with Instant Payout",
  "Cashback Apps that Pay via PayPal",
  "How Much Can You Save with Cashback Apps?",
  "Best Travel Cashback Apps",
  "Cashback for Online Clothing Shopping",
  "How to Maximize Cashback on Everyday Purchases",
  "Cashback Apps vs Rewards Credit Cards",
  "Cashback Apps for Restaurants and Food",
  "Best Pharmacy and Drug Store Cashback",
  "Cashback on Subscription Services",

  // Audience-specific
  "Qmee for Students: Make Money Between Classes",
  "Qmee for Stay-at-Home Parents: Earn During Nap Time",
  "Qmee for Seniors: Easy Extra Income",
  "Qmee for Part-Time Workers: Supplement Your Income",
  "Qmee for Remote Workers: Earn During Breaks",
  "Qmee for Unemployed: Bridge Income Gap",
  "Qmee for Retirees: Fun Way to Earn Extra Cash",
  "Qmee for Teenagers: Can Under-18s Use It?",
  "Qmee for Night Owls: Surveys Available Late Night?",
  "Qmee for Commuters: Earn on Public Transport",
  "Qmee for Travelers: Make Money Abroad",
  "Qmee for Gig Workers: Supplement Gig Income",
  "Qmee During Lunch Break: How Much Can You Earn?",
  "Qmee for Shoppers: Combine with Cashback",
  "Qmee for Gaming Enthusiasts: Earn While Having Fun",

  // Comparisons general
  "Best Survey Apps Compared: Full Rankings",
  "Swagbucks vs Survey Sites: Which Is Better?",
  "Survey Junkie Review: Is It Worth It?",
  "InboxDollars Review: Pros and Cons",
  "Vindale Research Review",
  "Toluna Review: Is It Legit?",
  "YouGov Review: How Much Does It Pay?",
  "Pinecone Research Review: Worth Joining?",
  "LifePoints Review: Full Analysis",
  "Branded Surveys Review",
  "Prolific Review: Best Survey Site for High Pay?",
  "UserTesting Review: Earn More Per Survey",
  "Respondent.io Review: High-Paying Surveys",
  "Dynata Review: Is It Legit?",
  "Kantar Profiles Review",
  "OneOpinion Review",
  "Opinion Outpost Review",
  "Harris Poll Online Review",
  "iPoll Review: Is It Worth It?",
  "SurveyTime Review",

  // Earning strategies
  "How to Earn $20 a Day from Survey Apps",
  "Best Survey App Stacking Strategy",
  "Morning Routine for Maximum Survey Earnings",
  "How to Track Your Online Earnings",
  "Best Apps to Use Together for More Money",
  "How to Turn Survey Money into Passive Income",
  "Reinvesting Survey Earnings: Smart Money Moves",
  "How to Budget Your Survey Earnings",
  "Survey Earnings for Christmas Shopping",
  "Using Survey Money to Pay Bills",
  "Survey Earnings Goal Setting: How to Stay Motivated",
  "How to Earn a Consistent $100 Monthly from Surveys",
  "Survey Apps with Daily Earning Bonuses",
  "Earning from Multiple Survey Apps: Strategy Guide",
  "How to Earn Amazon Gift Cards for Free",

  // PayPal & payment
  "Best Apps That Pay via PayPal Instantly",
  "How to Cash Out to PayPal from Survey Sites",
  "Venmo vs PayPal for Survey Earnings",
  "Best Ways to Use Survey Earnings",
  "Survey Sites with Gift Card Rewards",
  "Best Amazon Gift Card Earning Apps",
  "How to Convert Survey Points to Cash",
  "Survey Sites with Cryptocurrency Payouts",
  "Survey Earnings and PayPal Limits",
  "How Much Survey Income Is Taxable?",

  // Qmee specific features
  "Qmee Piggy Bank: What Is It?",
  "Qmee Search Rewards: How They Work",
  "Qmee Surveys Tab: Complete Guide",
  "Qmee Cashback Tab: How to Use It",
  "Qmee Gaming Tab: Everything You Need to Know",
  "Qmee Deals Section: How to Find Best Offers",
  "Qmee Notifications: Should You Enable Them?",
  "Qmee Stats: How to Track Your Progress",
  "Qmee Leaderboard: How It Works",
  "Qmee Milestones and Achievements",
  "Qmee New Features: Latest Updates",
  "Qmee vs Old Version: What Changed?",
  "Qmee Browser Extension: Install and Use Guide",
  "Qmee on iPad: Does It Work Well?",
  "Qmee Tablet Experience: Full Review",

  // FAQ
  "Is Qmee Worth It for $1 an Hour?",
  "Does Qmee Really Pay?",
  "How Long Does Qmee Take to Pay?",
  "Can You Make Real Money on Qmee?",
  "Does Qmee Have a Referral Bonus?",
  "Is Qmee Free to Use?",
  "Can You Use Qmee in Any Country?",
  "Does Qmee Sell Your Data?",
  "How Does Qmee Make Money?",
  "Is Qmee Better Than Swagbucks?",
  "Can You Use Qmee on a Computer?",
  "Does Qmee Have a Desktop App?",
  "Is Qmee Available in Canada?",
  "Is Qmee Available in the UK?",
  "Is Qmee Available in Australia?",
  "Can You Have Multiple Qmee Accounts?",
  "Does Qmee Work Without the App?",
  "How Do I Contact Qmee Support?",
  "Does Qmee Have a Forum or Community?",
  "What Happens to Your Qmee Balance if You Stop Using It?",

  // Trending
  "Best Survey Apps to Download Right Now",
  "Make Money Online: 2024 Realistic Guide",
  "Apps That Pay You to Take Surveys",
  "How TikTok Surveys Compare to Apps Like Qmee",
  "Survey Apps vs YouTube: Which Makes More?",
  "Gen Z Money-Making Apps Worth Using",
  "Best Side Hustle Apps for Extra Income",
  "Survey Apps That Launched Recently Worth Trying",
  "Survey Apps with the Best User Experience",
  "Highest Rated Survey Apps on App Store",

  // Lifestyle & motivation
  "How I Made $200 Last Month Taking Surveys",
  "My Qmee Earnings Diary: 30 Days of Results",
  "Survey Apps: Are They Worth the Time?",
  "What I Wish I Knew Before Using Survey Apps",
  "How Survey Money Changed My Budget",
  "Using Survey Apps to Pay for Subscriptions",
  "Survey Earnings for Vacation Fund",
  "How Survey Apps Help When Money Is Tight",
  "Building an Emergency Fund with Survey Earnings",
  "Survey Apps for Financial Independence",

  // Long-tail bonus
  "Qmee for iPhone: Download and Setup Guide",
  "Qmee for Android: How to Get Started",
  "Qmee Sign-Up Bonus: What to Expect",
  "Does Qmee Offer a Welcome Bonus?",
  "Qmee Earning Cap: Is There a Maximum?",
  "Qmee Survey Availability by Location",
  "Why Qmee Has No Minimum Cashout",
  "Qmee Piggy Mascot: The Story Behind It",
  "Qmee Company Background: Who Made It?",
  "Qmee Funding and Growth Story",
  "Qmee vs Other No-Minimum Survey Sites",
  "Qmee Charity Cash Out: How to Donate",
  "Qmee Mental Health Break Surveys: Taking It Easy",
  "Qmee Survey Topics I Love: Categories That Pay Well",
  "Qmee for Market Research: What You're Contributing",
  "How Brands Use Qmee Survey Data",
  "Survey Fatigue: How to Avoid Burning Out",
  "Realistic Survey Income Goals for Beginners",
  "Survey Income Tax Guide for US Users",
  "Best Survey Income Tracker Apps",
];

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function generateArticle(groq: Groq, cerebras: Cerebras, topic: string, index: number) {
  const slug = slugify(topic);
  const outPath = path.join("content", "articles", `${slug}.json`);
  if (fs.existsSync(outPath)) {
    const e = JSON.parse(fs.readFileSync(outPath, "utf-8"));
    if (!e.error) { console.log(`[${index + 1}/500] SKIP: ${topic}`); return; }
    fs.unlinkSync(outPath);
  }

  const prompt = `Write a comprehensive SEO article titled "${topic}" for a site about Qmee, the free survey and cashback app.

REQUIREMENTS:
- 800-1200 words, helpful tone
- Naturally mention "Qmee" throughout
- H1, H2, H3 sections, short paragraphs
- At least 3 [CTA] placeholders
- First line: META: <120-160 char description>
- Second line: KEYWORDS: kw1, kw2, kw3, kw4, kw5
- HTML with h1, h2, h3, p, ul, li tags
- [CTA] text: "Join Qmee Free" or "Start Earning with Qmee"
- No actual URLs — [CTA] only

Article: ${topic}`;

  try {
    let content = "";
    if (useGroq) {
      try {
        const r = await groq.chat.completions.create({ model: "llama-3.3-70b-versatile", messages: [{ role: "user", content: prompt }], max_tokens: 2000, temperature: 0.8 });
        content = r.choices[0]?.message?.content ?? "";
      } catch (e: unknown) {
        if (String(e).includes("429") || String(e).includes("rate_limit") || String(e).includes("tokens per day")) {
          console.log("Groq quota hit — switching to Cerebras"); useGroq = false;
        } else throw e;
      }
    }
    if (!useGroq || !content) {
      const r = await cerebras.chat.completions.create({ model: "llama3.1-8b", messages: [{ role: "user", content: prompt }], max_tokens: 2000, // @ts-ignore
        temperature: 0.8 });
      // @ts-ignore
      content = (r.choices[0]?.message?.content as string) ?? "";
      if (!useGroq) console.log(`[${index + 1}/500] Cerebras: ${topic}`);
    }

    const meta = content.match(/META:\s*(.+)/)?.[1]?.trim() ?? `Learn about ${topic} and how to earn more with Qmee.`;
    const kw = content.match(/KEYWORDS:\s*(.+)/)?.[1]?.split(",").map((k: string) => k.trim()) ?? ["Qmee", "surveys", "make money online"];
    const body = content.replace(/META:\s*.+\n?/, "").replace(/KEYWORDS:\s*.+\n?/, "")
      .replace(/\[CTA\]/g, `<a href="${AFFILIATE}" class="cta-link">Join Qmee Free →</a>`);

    fs.writeFileSync(outPath, Buffer.from(JSON.stringify({ slug, title: topic, metaDescription: meta, keywords: kw, body, generatedAt: new Date().toISOString() }, null, 2), "utf-8"));
    console.log(`[${index + 1}/500] DONE: ${topic}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[${index + 1}/500] ERROR: ${topic} — ${msg}`);
    fs.writeFileSync(outPath, Buffer.from(JSON.stringify({ slug, title: topic, metaDescription: "", keywords: [], body: "", generatedAt: new Date().toISOString(), error: msg }, null, 2), "utf-8"));
  }
  await new Promise((r) => setTimeout(r, 13000));
}

async function main() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, "utf-8").split("\n").forEach((line) => {
      const [k, ...v] = line.split("=");
      if (k && v.length) process.env[k.trim()] = v.join("=").trim();
    });
  }
  const groqKey = process.env.GROQ_API_KEY;
  const cerebrasKey = process.env.CEREBRAS_API_KEY;
  if (!groqKey && !cerebrasKey) { console.error("No API keys"); process.exit(1); }
  if (!groqKey) { useGroq = false; console.log("Cerebras only"); }
  const groq = new Groq({ apiKey: groqKey ?? "none" });
  const cerebras = new Cerebras({ apiKey: cerebrasKey ?? "none" });
  fs.mkdirSync(path.join("content", "articles"), { recursive: true });
  console.log(`Generating ${ARTICLE_TOPICS.length} articles...`);
  for (let i = 0; i < ARTICLE_TOPICS.length; i++) await generateArticle(groq, cerebras, ARTICLE_TOPICS[i], i);
  console.log("Done! All articles generated.");
}
main().catch(console.error);
