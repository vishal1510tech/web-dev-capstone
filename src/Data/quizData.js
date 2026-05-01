export const quizQuestions = [
  {
    id: 1, topic: 'Phishing',
    question: "You receive an urgent email from your bank saying your account will be suspended unless you click a link and verify your details within 24 hours. What is the safest action?",
    options: [
      { id: 'a', text: "Click the link immediately — your account might be at risk." },
      { id: 'b', text: "Forward the email to friends to see if they got it too." },
      { id: 'c', text: "Open a new browser tab and navigate directly to your bank's official website." },
      { id: 'd', text: "Reply to the email asking them to confirm their identity." },
    ],
    correctId: 'c',
    explanation: "Urgency is the hallmark of phishing. Legitimate banks will never suspend accounts for not clicking an email link. Always navigate directly to the official website by typing the URL yourself.",
  },
  {
    id: 2, topic: 'Passwords',
    question: "Which of the following is the strongest password strategy?",
    options: [
      { id: 'a', text: "Using one very strong 16-character password for all your accounts." },
      { id: 'b', text: "A unique, randomly generated password for each account stored in a password manager." },
      { id: 'c', text: "Your name combined with your birth year, e.g. 'Aryan2003!'." },
      { id: 'd', text: "A memorable phrase like 'ilovecybersecurity' used everywhere." },
    ],
    correctId: 'b',
    explanation: "Reusing passwords — even strong ones — is dangerous. If one service is breached, attackers use credential stuffing to try that password everywhere. A password manager generates a unique strong password for every site.",
  },
  {
    id: 3, topic: 'Public Wi-Fi',
    question: "You're at a coffee shop and need to check your bank account. The café offers free Wi-Fi. What should you do?",
    options: [
      { id: 'a', text: "Connect to the café Wi-Fi — it's probably fine." },
      { id: 'b', text: "Use a VPN on the café Wi-Fi to encrypt your traffic." },
      { id: 'c', text: "Use your mobile data hotspot instead." },
      { id: 'd', text: "Both B and C are good options." },
    ],
    correctId: 'd',
    explanation: "Public Wi-Fi can be intercepted by other users on the same network. Using mobile data avoids the risk entirely. If you must use public Wi-Fi, a VPN encrypts your traffic, making interception much harder.",
  },
  {
    id: 4, topic: 'Software Updates',
    question: "Your laptop shows a notification that a critical security update is available. You're busy. What is the right call?",
    options: [
      { id: 'a', text: "Dismiss it — updates often break things and can wait a few months." },
      { id: 'b', text: "Schedule it for the next available time, ideally today or tonight." },
      { id: 'c', text: "Disable automatic updates so they don't interrupt your work." },
      { id: 'd', text: "Wait until colleagues confirm the update is safe." },
    ],
    correctId: 'b',
    explanation: "Once a patch is released, attackers know the vulnerability exists and immediately begin scanning for unpatched systems. Schedule updates as soon as possible — delaying by weeks is a significant risk.",
  },
  {
    id: 5, topic: 'Multi-Factor Authentication',
    question: "What does Multi-Factor Authentication (MFA) protect you against most effectively?",
    options: [
      { id: 'a', text: "Stolen or leaked passwords being used to access your account." },
      { id: 'b', text: "Malware installed on your own device." },
      { id: 'c', text: "DDoS attacks against the services you use." },
      { id: 'd', text: "Zero-day vulnerabilities in your browser." },
    ],
    correctId: 'a',
    explanation: "MFA adds a second verification step beyond just a password. Even if an attacker steals your password through a breach or phishing, they cannot log in without the second factor.",
  },
  {
    id: 6, topic: 'Social Engineering',
    question: "Someone calls you claiming to be from IT support. They say they need your login credentials to fix malware on your machine. What do you do?",
    options: [
      { id: 'a', text: "Provide your credentials — IT support needs them to do their job." },
      { id: 'b', text: "Ask for their employee ID and then give the credentials." },
      { id: 'c', text: "Hang up and call IT support back on the official number from your company directory." },
      { id: 'd', text: "Give a fake password first to test if they're legitimate." },
    ],
    correctId: 'c',
    explanation: "Legitimate IT departments never ask for your password. This is a classic vishing attack. Hang up and independently verify by calling IT using a number from your official company directory.",
  },
  {
    id: 7, topic: 'Data Backups',
    question: "What is the '3-2-1 backup rule' in cybersecurity?",
    options: [
      { id: 'a', text: "Back up every 3 hours, to 2 cloud services, with 1 local copy." },
      { id: 'b', text: "Keep 3 copies of data, on 2 different media types, with 1 copy offsite." },
      { id: 'c', text: "Use 3 passwords, 2 MFA methods, and 1 security key." },
      { id: 'd', text: "Backup 3 times a week, 2 folders deep, with 1 encryption layer." },
    ],
    correctId: 'b',
    explanation: "3 copies means if one fails you still have two. 2 different media types protects against media-specific failures. 1 offsite copy protects against physical disasters. This is critical ransomware protection.",
  },
  {
    id: 8, topic: 'HTTPS & Certificates',
    question: "You see a padlock icon 🔒 next to a website's URL. What does this guarantee?",
    options: [
      { id: 'a', text: "The website is safe, trustworthy, and not a scam." },
      { id: 'b', text: "Your connection to the server is encrypted, but not that the site itself is legitimate." },
      { id: 'c', text: "The website has been verified by the government." },
      { id: 'd', text: "Your personal data will not be stored or shared." },
    ],
    correctId: 'b',
    explanation: "HTTPS and the padlock only mean your connection is encrypted in transit. It says nothing about whether the site is legitimate. Phishing sites routinely use HTTPS. Always verify the domain name too.",
  },
  {
    id: 9, topic: 'Ransomware',
    question: "Your files suddenly become inaccessible and a message demands Bitcoin for the decryption key. What is the recommended response?",
    options: [
      { id: 'a', text: "Pay immediately — it's the fastest way to recover your files." },
      { id: 'b', text: "Disconnect from the network, do not pay, report to authorities, and restore from backups." },
      { id: 'c', text: "Restart your computer multiple times to try to clear the infection." },
      { id: 'd', text: "Email the attackers to negotiate a lower price." },
    ],
    correctId: 'b',
    explanation: "Do not pay — it funds criminal operations and provides no guarantee of file recovery. Immediately disconnect from the network to prevent spreading. Report to authorities, then restore from clean backups.",
  },
  {
    id: 10, topic: 'Privacy',
    question: "Which practice best reduces your digital footprint and personal data exposure?",
    options: [
      { id: 'a', text: "Only using social media with a pseudonym." },
      { id: 'b', text: "Reviewing app permissions, using a privacy-focused browser, and opting out of data collection." },
      { id: 'c', text: "Deleting your Google account." },
      { id: 'd', text: "Using Incognito/Private mode for all browsing." },
    ],
    correctId: 'b',
    explanation: "Incognito mode only prevents local browsing history. The most effective approach is layered: audit app permissions, use privacy-respecting tools (Firefox, Brave, DuckDuckGo), and actively opt out of data collection.",
  },
]

export const scoreRatings = [
  { min: 9, max: 10, label: 'Cyber Guardian', icon: '🛡️', color: 'text-cyber-green', borderColor: 'border-cyber-green',
    message: 'Outstanding. You have a strong, nuanced understanding of cybersecurity. Help teach others around you.' },
  { min: 7, max: 8, label: 'Security Aware', icon: '✅', color: 'text-cyber-blue', borderColor: 'border-cyber-blue',
    message: 'Solid foundation. Review the questions you missed and explore those topics in the Threat Gallery.' },
  { min: 5, max: 6, label: 'Learning Mode', icon: '📚', color: 'text-cyber-amber', borderColor: 'border-cyber-amber',
    message: "You've got the basics but there are gaps. Spend time in the Threat Gallery and retake the quiz." },
  { min: 0, max: 4, label: 'At Risk', icon: '⚠️', color: 'text-cyber-red', borderColor: 'border-cyber-red',
    message: 'Your current knowledge leaves you significantly exposed. Start with Phishing, Passwords, and Social Engineering.' },
]

export function getRating(score) {
  return scoreRatings.find(r => score >= r.min && score <= r.max) || scoreRatings[scoreRatings.length - 1]
}