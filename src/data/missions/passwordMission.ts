// src/data/missions/passwordMission.ts
import { StoryModuleData } from '../../components/missions/StoryModuleContainer';
import { QuizQuestion } from '../../components/quiz/QuizComponent';

// Mika's Password Palace Story Modules
export const passwordStoryModules: StoryModuleData[] = [
  {
    id: 'mika-intro',
    title: 'The Digital Marketplace Guardian',
    content: `In a vibrant African village nestled between rolling hills and flowing rivers, there lived a clever young girl named Mika. She was known throughout the region for her quick thinking and creative spirit.

Mika's grandmother was the keeper of the village marketplace, a bustling center of trade where people from many communities would gather to sell their goods and share stories. As Mika grew older, she began to help her grandmother manage the marketplace.

"Mika," her grandmother said one day, "our marketplace is growing beyond our village. People from far away want to trade with us using their digital devices. I need someone I can trust to protect our new Digital Marketplace."

Mika's eyes lit up with excitement. This was her chance to combine her love of technology with her desire to help her community!`,
    visualTheme: 'marketplace',
    characters: ['👧🏾', '👵🏾'],
    culturalContext: 'African Marketplace Traditions',
    imageUrl: '/assets/images/missions/mika-marketplace.png'
  },
  {
    id: 'mika-challenge',
    title: 'The Challenge of Passwords',
    content: `Mika quickly learned that to protect the Digital Marketplace, she needed to create strong passwords that would keep out unwanted visitors.

"A password is like the special knock we use on our doors at home," explained her friend Jabari, who had studied technology in the city. "But in the digital world, if someone learns your knock, they can pretend to be you and take things that belong to you or your friends."

Mika thought about this carefully. "So I need to create a knock that's so complicated, nobody could guess it?"

"Exactly!" Jabari smiled. "In the digital world, we call that a strong password. The best passwords are long, use different types of characters, and aren't easy to guess."

Mika was determined to create the strongest passwords possible to protect her village's digital marketplace.`,
    visualTheme: 'marketplace',
    characters: ['👧🏾', '👦🏾'],
    culturalContext: 'African Marketplace Traditions'
  },
  {
    id: 'mika-learning',
    title: 'Crafting Strong Passwords',
    content: `Mika began studying how to create strong passwords. She learned several important rules:

1. Use at least 8 characters - the longer the better
2. Mix uppercase letters, lowercase letters, numbers, and special symbols
3. Don't use personal information like your name or birthday
4. Don't use common words that can be found in a dictionary
5. Create unique passwords for different accounts
6. Never share your passwords with strangers

Mika thought about the beautiful beadwork her grandmother created, with patterns so complex and colorful that each piece was unique. "Passwords are like our beadwork," she realized. "They should be complex patterns that represent something meaningful to us, but difficult for others to copy."

She started creating passwords that were inspired by the patterns in traditional beadwork, but with letters, numbers, and symbols instead of beads.`,
    visualTheme: 'marketplace',
    characters: ['👧🏾'],
    culturalContext: 'Traditional African Beadwork'
  },
  {
    id: 'mika-trickster',
    title: 'The Digital Trickster',
    content: `One day, a stranger arrived at the digital marketplace. He called himself "The Digital Trickster" and boasted that he could break into any account.

"I can guess anyone's password," he claimed. "People make the same mistakes over and over."

Mika listened carefully as the Trickster explained common password mistakes:

"People use their pet's name, followed by '123'. Or the word 'password' itself! Some use their birth year or their favorite team. I can guess these in minutes!"

The village elders were worried, but Mika remained calm. "I've prepared for this," she told them. "Our marketplace passwords are strong. They're like complex riddles that even the cleverest trickster cannot solve."

The Trickster challenged Mika to a test. He would try to break into a test account, and if he succeeded, the village would pay him a consultant fee to improve their security.`,
    visualTheme: 'marketplace',
    characters: ['👧🏾', '🧙🏾‍♂️', '👴🏾'],
    culturalContext: 'African Folklore Trickster Character'
  },
  {
    id: 'mika-contest',
    title: 'The Password Contest',
    content: `Mika set up a test account with what seemed like a simple password: "baobab2023".

The Trickster laughed. "This will be too easy! The baobab tree is important in many African communities, and you added the current year. I've seen this pattern hundreds of times."

But after many attempts, he couldn't get in. He tried "Baobab2023", "baobab2023!", and many variations, growing more frustrated with each failure.

"What's the trick?" he finally asked Mika.

Mika smiled and explained: "The real password isn't actually 'baobab2023'. That would be too weak. Instead, I created 'B@0b@b_2o23&*' which looks similar but uses symbols and mixes characters. It's based on something meaningful to our village, but transformed into a strong pattern that's hard to guess."

The Trickster was impressed. "You've outsmarted me, Mika. Your marketplace is secure against tricksters like me."`,
    visualTheme: 'marketplace',
    characters: ['👧🏾', '🧙🏾‍♂️', '👨🏾‍💻'],
    culturalContext: 'African Problem Solving Traditions'
  },
  {
    id: 'mika-teaching',
    title: "Mika's Password School",
    content: `Word spread about how Mika had outsmarted the Digital Trickster. Soon, people from neighboring villages came to learn how to create strong passwords.

Mika began teaching password classes in the marketplace. She created a simple system to help everyone remember:

"Think of a phrase that's meaningful to you, like a proverb or song. Take the first letter of each word, change some letters to numbers or symbols, and add special characters."

For example, the traditional proverb "It takes a village to raise a child" became "It@v2r@c!"

Mika also taught everyone about the importance of creating different passwords for different accounts, just as they would use different keys for different locks in their homes.

The elders were so proud of Mika that they named her the official Guardian of the Digital Marketplace, responsible for protecting the online trading that was bringing prosperity to their community.`,
    visualTheme: 'marketplace',
    characters: ['👧🏾', '👨🏾‍🦱', '👩🏾‍🦱', '👵🏾'],
    culturalContext: 'African Education Traditions'
  }
];

// Mika's Password Palace Quiz Questions
export const passwordQuizQuestions: QuizQuestion[] = [
  {
    id: 'pw-q1',
    question: 'Which password is the strongest?',
    options: ['password123', 'MikaStrong2023!', 'marketplace', 'mika'],
    correctAnswer: 'MikaStrong2023!',
    explanation: "MikaStrong2023! is the strongest because it uses uppercase and lowercase letters, numbers, and a special character. It's also longer than the other options."
  },
  {
    id: 'pw-q2',
    question: 'In the story, Mika compared passwords to what traditional craft?',
    options: ['Pottery', 'Weaving', 'Beadwork', 'Wood carving'],
    correctAnswer: 'Beadwork',
    explanation: 'Mika compared passwords to beadwork, noting that both should be complex patterns that are unique and difficult for others to copy.'
  },
  {
    id: 'pw-q3',
    question: 'What is a good minimum length for a strong password?',
    options: ['4 characters', '6 characters', '8 characters', '3 characters'],
    correctAnswer: '8 characters',
    explanation: 'A strong password should have at least 8 characters. The longer the password, the harder it is to crack.'
  },
  {
    id: 'pw-q4',
    question: 'Which of these should you NOT use in your password?',
    options: ['Special symbols', 'Your birthday', 'Uppercase letters', 'Numbers'],
    correctAnswer: 'Your birthday',
    explanation: 'You should not use personal information like your birthday in your password. This information might be easy for others to find out or guess.'
  },
  {
    id: 'pw-q5',
    question: 'What did the Digital Trickster claim he could do?',
    options: ['Create unbreakable passwords', 'Break into any account', 'Fix computer problems', 'Make websites'],
    correctAnswer: 'Break into any account',
    explanation: "The Digital Trickster boasted that he could break into any account by guessing people's passwords."
  },
  {
    id: 'pw-q6',
    question: 'Why should you use different passwords for different accounts?',
    options: [
      'To confuse hackers',
      'To remember them more easily',
      'So if one password is discovered, not all accounts are compromised',
      'Because it\'s required by law'
    ],
    correctAnswer: 'So if one password is discovered, not all accounts are compromised',
    explanation: 'Using unique passwords for different accounts ensures that if one password is discovered, your other accounts remain secure.'
  },
  {
    id: 'pw-q7',
    question: 'Which of these is a good way to create a memorable but strong password?',
    options: [
      'Use your name followed by 123',
      'Use a common word like "password"',
      'Take the first letter of each word in a phrase, adding numbers and symbols',
      'Use the same password for everything so you don\'t forget'
    ],
    correctAnswer: 'Take the first letter of each word in a phrase, adding numbers and symbols',
    explanation: "Creating a password from the first letters of a meaningful phrase, then adding numbers and symbols, produces a strong password that's easier to remember."
  },
  {
    id: 'pw-q8',
    question: 'In the story, what password did Mika actually use to defeat the Trickster?',
    options: ['baobab2023', 'Baobab2023!', 'B@0b@b_2o23&*', 'digitalmarketplace'],
    correctAnswer: 'B@0b@b_2o23&*',
    explanation: 'Mika used "B@0b@b_2o23&*", which replaced letters with similar-looking symbols and added special characters to create a much stronger version of "baobab2023".'
  },
  {
    id: 'pw-q9',
    question: 'Which of these elements makes a password stronger?',
    options: [
      'Using only lowercase letters',
      'Using a common word',
      'Using a mix of characters (letters, numbers, symbols)',
      'Making it short and simple'
    ],
    correctAnswer: 'Using a mix of characters (letters, numbers, symbols)',
    explanation: 'A strong password uses a mix of different types of characters, including uppercase and lowercase letters, numbers, and special symbols.'
  },
  {
    id: 'pw-q10',
    question: 'What did Mika become at the end of the story?',
    options: [
      'A professional hacker',
      'Guardian of the Digital Marketplace',
      'The village chief',
      'A password programmer'
    ],
    correctAnswer: 'Guardian of the Digital Marketplace',
    explanation: 'The elders named Mika the official Guardian of the Digital Marketplace, responsible for protecting their online trading.'
  },
  {
    id: 'pw-q11',
    question: 'Which of these would be the weakest password?',
    options: ['Tr$pical*F1sh', 'P@ssw0rd!2023', 'password', 'Village&Community!2'],
    correctAnswer: 'password',
    explanation: 'The word "password" is one of the most commonly used and easily guessed passwords. It contains only lowercase letters and is a dictionary word.'
  },
  {
    id: 'pw-q12',
    question: 'How did Mika help her community after defeating the Trickster?',
    options: [
      'She built a new marketplace',
      'She taught password classes',
      'She became a professional hacker',
      'She moved to the city'
    ],
    correctAnswer: 'She taught password classes',
    explanation: 'After defeating the Trickster, Mika began teaching password classes to help people from her village and neighboring communities create strong passwords.'
  },
  {
    id: 'pw-q13',
    question: 'What is a "passphrase" and how does it relate to passwords?',
    options: [
      'A passphrase is the same as a password',
      'A passphrase is shorter than a password',
      'A passphrase is a longer password using multiple words or a sentence',
      'A passphrase is only used for email accounts'
    ],
    correctAnswer: 'A passphrase is a longer password using multiple words or a sentence',
    explanation: 'A passphrase is a type of password that uses a sequence of words or a sentence. Passphrases are often longer than traditional passwords, making them more secure while sometimes being easier to remember.'
  },
  {
    id: 'pw-q14',
    question: 'Why would changing "a" to "@" and "o" to "0" in a password make it stronger?',
    options: [
      'It doesn\'t make it stronger',
      'It makes the password shorter',
      'It adds character variety making it harder to guess',
      'It makes the password easier to type'
    ],
    correctAnswer: 'It adds character variety making it harder to guess',
    explanation: 'Replacing letters with similar-looking symbols or numbers adds complexity to your password by including different types of characters, making it harder to guess or crack.'
  },
  {
    id: 'pw-q15',
    question: 'What is the main purpose of a password?',
    options: [
      'To make logging in more difficult',
      'To protect your digital identity and information',
      'To help websites collect your data',
      'To make your account look professional'
    ],
    correctAnswer: 'To protect your digital identity and information',
    explanation: 'The main purpose of a password is to secure your accounts and protect your personal information and digital identity from unauthorized access.'
  }
];

// Don't use default export - use named exports instead

// If you're dealing with a module import issue, you could add this as a last resort,
// but named exports are preferred
// export default { passwordStoryModules, passwordQuizQuestions };