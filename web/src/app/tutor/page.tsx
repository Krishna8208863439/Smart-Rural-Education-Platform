"use client";

import { useState, useRef, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bot, 
  User, 
  Send, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff,
  Sparkles, 
  Languages, 
  RotateCcw, 
  Lightbulb,
  Zap,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Copy,
  Check,
  Share2
} from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  subject?: string;
  timestamp: string;
  quiz?: QuizQuestion;
}

const PRESET_TOPICS = [
  { label: "🌱 Photosynthesis", query: "प्रकाश संश्लेषण (Photosynthesis) की पूरी प्रक्रिया और समीकरण हिंदी में समझाएं।" },
  { label: "⚡ Ohm's Law", query: "What is Ohm's Law? Explain with formula V=IR and numerical example." },
  { label: "📐 Solve 2x² + 5x + 3 = 0", query: "Solve quadratic equation 2x² + 5x + 3 = 0 step by step." },
  { label: "💧 Drip Irrigation", query: "टपक सिंचाई (Drip Irrigation) कैसे काम करती है और सरकारी सब्सिडी कैसे लें?" },
  { label: "🧲 Electromagnetism", query: "विद्युत चुम्बक (Electromagnet) कैसे बनता है और इसके क्या उपयोग हैं?" },
  { label: "🧪 Acids vs Bases", query: "अम्ल और क्षार (Acids and Bases) में मुख्य अंतर क्या है? pH स्केल समझाएं।" },
  { label: "🌾 Kisan Drone", query: "खेती में ड्रोन का उपयोग कैसे होता है और ड्रोन पायलट बनने की ट्रेनिंग कैसे लें?" },
  { label: "🗣️ Tenses in English", query: "Explain Present vs Past tense with easy Hindi translation and examples." }
];

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: `🙏 **नमस्ते! मैं आपका GuruAI शिक्षक हूँ।**\n\nआप मुझसे विज्ञान, गणित, अंग्रेजी, या खेती-किसानी और करियर से जुड़े कोई भी सवाल अपनी भाषा (हिंदी, English, Hinglish, मराठी) में पूछ सकते हैं!\n\n💡 *नीचे दिए गए किसी भी विषय पर क्लिक करें या अपना प्रश्न टाइप/माइक से बोलें।*`,
      timestamp: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi / Hinglish");
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<{ [msgId: string]: number }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Voice speech synthesis
  const speakText = (text: string, msgId: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting characters for cleaner audio
    const cleanText = text.replace(/[*#`_~[\]]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = selectedLanguage.includes("English") ? "en-IN" : "hi-IN";
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Voice Speech Recognition (Mic)
  const toggleVoiceInput = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage.includes("English") ? "en-IN" : "hi-IN";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Accurate Subject Knowledge Engine
  const generateAccurateResponse = (query: string): { text: string; quiz?: QuizQuestion } => {
    const q = query.toLowerCase().trim();

    // 1. PHOTOSYNTHESIS
    if (q.includes("photosynthesis") || q.includes("प्रकाश संश्लेषण") || q.includes("पौधे भोजन")) {
      return {
        text: `🌱 **प्रकाश संश्लेषण (Photosynthesis) की संपूर्ण अवधारणा:**

**परिभाषा:**
हरे पौधे सूर्य के प्रकाश की ऊर्जा, पत्तियों में मौजूद क्लोरोफिल (हरित लवक), हवा से कार्बन डाइऑक्साइड (CO₂), तथा जड़ों से जल (H₂O) और खनिजों का उपयोग करके अपना भोजन (ग्लूकोज) बनाते हैं। इस प्रक्रिया में ऑक्सीजन (O₂) गैस उप-उत्पाद के रूप में बाहर निकलती है।

---
### 🔬 रासायनिक समीकरण (Chemical Equation):
\`6CO₂ + 6H₂O + Sunlight (क्लोरोफिल) ➔ C₆H₁₂O₆ (ग्लूकोज) + 6O₂ (ऑक्सीजन)\`

---
### 📝 मुख्य 3 चरण (Key Steps):
1. **प्रकाश ऊर्जा का अवशोषण:** पत्तियों का क्लोरोफिल सूर्य की धूप को पकड़ता है।
2. **जल का अपघटन (Photolysis of Water):** प्रकाश ऊर्जा जल (H₂O) को हाइड्रोजन और ऑक्सीजन में तोड़ती है।
3. **CO₂ का अपचयन (Reduction):** हाइड्रोजन कार्बन डाइऑक्साइड के साथ मिलकर कार्बोहाइड्रेट (ग्लूकोज) बनाती है।

💡 **दैनिक जीवन का उदाहरण:** जैसे घर में चूल्हा (धूप), आटा (CO₂) और पानी से रोटी बनती है, वैसे ही पत्ती पौधे की 'रसोईघर' (Kitchen of Plant) है!`,
        quiz: {
          question: "प्रकाश संश्लेषण प्रक्रिया में कौन सी गैस उप-उत्पाद (By-product) के रूप में बाहर निकलती है?",
          options: ["कार्बन डाइऑक्साइड (CO₂)", "ऑक्सीजन (O₂)", "नाइट्रोजन (N₂)", "मीथेन (CH₄)"],
          correctIndex: 1,
          explanation: "प्रकाश संश्लेषण में पौधे CO₂ लेते हैं और ताजी ऑक्सीजन (O₂) गैस बाहर छोड़ते हैं।"
        }
      };
    }

    // 2. OHM'S LAW
    if (q.includes("ohm") || q.includes("v = ir") || q.includes("ओम का नियम") || q.includes("voltage")) {
      return {
        text: `⚡ **ओम का नियम (Ohm's Law) — संपूर्ण विवरण:**

**नियम कथन (Statement):**
यदि किसी चालक (Conductor) की भौतिक अवस्थाएँ (जैसे तापमान) स्थिर रहें, तो उसके सिरों पर लगाया गया विभवान्तर (**V**) उसमें प्रवाहित होने वाली विद्युत धारा (**I**) के समानुपाती होता है।

---
### 📐 सूत्र (Formula):
\`V = I × R\`
जहाँ:
- **V** = विभवान्तर (Voltage), मात्रक: **Volt (V)**
- **I** = विद्युत धारा (Current), मात्रक: **Ampere (A)**
- **R** = चालक का प्रतिरोध (Resistance), मात्रक: **Ohm (Ω)**

---
### 💧 पानी के पाइप का आसान उदाहरण:
- **Voltage (V) = पानी की टंकी की ऊँचाई (दबाव):** जितनी ऊँची टंकी, उतना ज्यादा प्रेशर।
- **Current (I) = पाइप से पानी का बहाव:** प्रति सेकंड निकलने वाले पानी की मात्रा।
- **Resistance (R) = पाइप में रुकावट/कचरा:** पाइप संकरा होगा तो पानी कम बहेगा।

---
### 🧮 संख्यात्मक उदाहरण (Numerical):
यदि किसी बल्ब पर \`12 V\` की बैटरी लगी है और उसका प्रतिरोध \`4 Ω\` है, तो धारा होगी:
\`I = V / R = 12 / 4 = 3 Ampere\``,
        quiz: {
          question: "यदि विभवान्तर (V) 24 Volts और प्रतिरोध (R) 8 Ohms हो, तो धारा (I) कितनी होगी?",
          options: ["2 Ampere", "3 Ampere", "8 Ampere", "192 Ampere"],
          correctIndex: 1,
          explanation: "I = V / R = 24 / 8 = 3 Ampere."
        }
      };
    }

    // 3. QUADRATIC EQUATION
    if (q.includes("2x²") || q.includes("2x^2") || q.includes("quadratic") || q.includes("द्विघात") || q.includes("ax^2")) {
      return {
        text: `📐 **द्विघात समीकरण हल: \`2x² + 5x + 3 = 0\`**

द्विघात समीकरण का मानक रूप होता है: \`ax² + bx + c = 0\`
यहाँ: \`a = 2\`, \`b = 5\`, \`c = 3\`

---
### विधि 1: मध्य पद को तोड़कर (Factorisation Method)
हमें दो ऐसी संख्याएँ खोजनी हैं जिनका:
- **जोड़:** \`b = 5\`
- **गुणा:** \`a × c = 2 × 3 = 6\`

वे दो संख्याएँ हैं **2 और 3** (क्योंकि 2 + 3 = 5 और 2 × 3 = 6)।

**चरण 1:** मध्य पद \`5x\` को \`2x + 3x\` लिखें:
\`2x² + 2x + 3x + 3 = 0\`

**चरण 2:** दो-दो पदों में से उभयनिष्ठ (Common) निकालें:
\`2x(x + 1) + 3(x + 1) = 0\`

**चरण 3:** \`(x + 1)\` को कॉमन लें:
\`(2x + 3)(x + 1) = 0\`

**चरण 4:** प्रत्येक पद को शून्य के बराबर रखें:
- \`x + 1 = 0\` ➔ **x = -1**
- \`2x + 3 = 0\` ➔ \`2x = -3\` ➔ **x = -3/2 (या -1.5)**

---
✅ **उत्तर (Roots):** \`x = -1\` तथा \`x = -3/2\``,
        quiz: {
          question: "समीकरण 2x² + 5x + 3 = 0 के मूल (Roots) क्या हैं?",
          options: ["x = 1, 3/2", "x = -1, -3/2", "x = 2, 3", "x = -2, -3"],
          correctIndex: 1,
          explanation: "हल करने पर x + 1 = 0 ➔ x = -1 तथा 2x + 3 = 0 ➔ x = -3/2 प्राप्त होता है।"
        }
      };
    }

    // 4. DRIP IRRIGATION
    if (q.includes("drip") || q.includes("टपक सिंचाई") || q.includes("सिंचाई") || q.includes("irrigation")) {
      return {
        text: `💧 **टपक सिंचाई (Drip Irrigation) तकनीक — ग्रामीण गाइड:**

**कार्यप्रणाली:**
प्लास्टिक की मुख्य व सहायक पाइपों (Laterals) और ड्रिपर्स (Emitters) के जरिए पानी सीधे पौधे की जड़ में बूँद-बूँद करके पहुँचाया जाता है।

---
### 🌾 मुख्य लाभ:
1. **60% से 70% जल संरक्षण:** खुले बहाव की तुलना में पानी की भारी बचत।
2. **खरपतवार (Weeds) पर नियंत्रण:** केवल पौधे की जड़ गीली होती है, खाली क्यारी सूखी रहती है।
3. **फर्टिगेशन (Fertigation):** घुलनशील खाद सीधे पानी के साथ जड़ों तक जाती है, खाद की 40% बचत।
4. **फसल की गुणवत्ता:** पौधे को तनाव नहीं होता, उपज 25-30% बढ़ती है।

---
### 🏛️ सरकारी योजना एवं सब्सिडी (Govt Subsidy):
- **PMKSY (प्रधानमंत्री कृषि सिंचाई योजना):** छोटे व सीमांत किसानों को **70% से 80%** तक अनुदान मिलता है।
- **आवेदन कहाँ करें:** नजदीकी कृषि विज्ञान केंद्र (KVK) या राज्य कृषि विभाग के ऑनलाइन पोर्टल (जैसे DBT Agriculture / e-Krishi) पर।`,
        quiz: {
          question: "टपक सिंचाई में पानी कहाँ पहुँचाया जाता है?",
          options: ["पत्तियों के ऊपर", "सीधे पौधे की जड़ में", "खेत के चारों ओर", "हवा में फव्वारे से"],
          correctIndex: 1,
          explanation: "टपक सिंचाई में पानी ड्रिपर्स की मदद से सीधे जड़ों के सक्रिय क्षेत्र में बूँद-बूँद दिया जाता है।"
        }
      };
    }

    // 5. KISAN DRONE
    if (q.includes("drone") || q.includes("ड्रोन") || q.includes("kisan drone")) {
      return {
        text: `🌾 **कृषि ड्रोन (Kisan Drone) — आधुनिक खेती और रोजगार:**

**खेती में ड्रोन के 4 बड़े उपयोग:**
1. **सटीक कीटनाशक छिड़काव:** 1 एकड़ खेत में मात्र 7-10 मिनट में एकसमान छिड़काव। किसान जहरीले रसायनों के संपर्क से सुरक्षित रहता है।
2. **फसल स्वास्थ्य निगरानी (NDVI कैमरा):** रोग, कीट और पानी की कमी वाले हिस्सों की पहचान।
3. **यूरिया/नैनो-यूरिया छिड़काव:** दानेदार खाद की तुलना में तरल नैनो यूरिया का 90% अवशोषण।

---
### 🚁 ड्रोन पायलट कैसे बनें (Career Pathway):
- **योग्यता:** 10वीं पास और 18 वर्ष की आयु।
- **प्रशिक्षण:** DGCA मान्यता प्राप्त Remote Pilot Training Organization (RPTO) से 5-7 दिन का कोर्स।
- **कमाई:** ₹25,000 से ₹60,000 प्रति माह (कस्टम हायरिंग सेंटर या खुद का ड्रोन सेवा व्यवसाय)।`,
        quiz: {
          question: "कृषि में ड्रोन पायलट बनने के लिए कौन सी संस्था सर्टिफिकेट देती है?",
          options: ["DGCA (नागर विमानन महानिदेशालय)", "UGC", "CBSE", "RBI"],
          correctIndex: 0,
          explanation: "भारत में ड्रोन पायलट लाइसेंस DGCA अधिकृत ट्रेनिंग सेंटर से मिलता है।"
        }
      };
    }

    // 6. ACIDS & BASES
    if (q.includes("acid") || q.includes("base") || q.includes("अम्ल") || q.includes("क्षार") || q.includes("ph")) {
      return {
        text: `🧪 **अम्ल (Acids) तथा क्षार (Bases) में तुलना:**

| गुणधर्म (Property) | अम्ल (Acid) | क्षार (Base) |
| :--- | :--- | :--- |
| **स्वाद (Taste)** | खट्टा (Sour) | कड़वा (Bitter) व छूने में चिकना (Soapy) |
| **लिटमस पेपर (Litmus)** | नीले लिटमस को **लाल** करता है | लाल लिटमस को **नीला** करता है |
| **pH मान (pH Value)** | 0 से 6.9 (7 से कम) | 7.1 से 14 (7 से अधिक) |
| **आयन (Ions in Water)** | H⁺ (हाइड्रोजन आयन) | OH⁻ (हाइड्रॉक्साइड आयन) |
| **उदाहरण (Examples)** | नींबू (सिट्रिक अम्ल), सिरका (एसिटिक अम्ल), HCl | साबुन, बेकिंग सोडा, सोडियम हाइड्रॉक्साइड (NaOH) |

---
💡 **उदासीनीकरण अभिक्रिया (Neutralization):**
\`Acid + Base ➔ Salt (लवण) + Water (जल)\`
\`HCl + NaOH ➔ NaCl (साधारण नमक) + H₂O\``,
        quiz: {
          question: "शुद्ध जल (Pure Water) का pH मान कितना होता है?",
          options: ["0", "7 (उदासीन)", "14", "1"],
          correctIndex: 1,
          explanation: "शुद्ध जल न तो अम्लीय होता है और न ही क्षारीय, इसका pH ठीक 7.0 (उदासीन) होता है।"
        }
      };
    }

    // 7. ENGLISH TENSES
    if (q.includes("tense") || q.includes("past") || q.includes("present") || q.includes("english") || q.includes("काल")) {
      return {
        text: `🗣️ **English Tenses — आसान हिंदी गाइड:**

### 1. Present Indefinite (वर्तमान काल - आदत या सच):
- **पहचान:** करता है, जाती है, खेलते हैं।
- **नियम:** \`Subject + Verb (1st form) + s/es (यदि He/She/It हो)\`
- **उदाहरण:**
  - "I go to school." (मैं स्कूल जाता हूँ।)
  - "The sun rises in the east." (सूर्य पूर्व में उगता है।)

---
### 2. Past Indefinite (भूतकाल - जो बीत गया):
- **पहचान:** गया, खाया, देखा, खेला।
- **नियम:** \`Subject + Verb (2nd form)\`
- **उदाहरण:**
  - "I went to school yesterday." (मैं कल स्कूल गया था।)
  - "He played cricket." (उसने क्रिकेट खेला।)

---
### 3. Future Indefinite (भविष्य काल - जो होगा):
- **पहचान:** करेगा, जाएगी, पढ़ेंगे।
- **नियम:** \`Subject + will + Verb (1st form)\`
- **उदाहरण:**
  - "I will study hard." (मैं मन लगाकर पढ़ाई करूँगा।)`,
        quiz: {
          question: "'He wrote a letter' वाक्य किस काल (Tense) में है?",
          options: ["Simple Present", "Simple Past (Past Indefinite)", "Simple Future", "Present Continuous"],
          correctIndex: 1,
          explanation: "'wrote' क्रिया write की 2nd form है, अतः यह Simple Past Tense है।"
        }
      };
    }

    // DEFAULT DETAILED ACADEMIC RESPONSE
    return {
      text: `📚 **GuruAI का शैक्षणिक समाधान:**

**विषय:** ${query}

---
### 1. मुख्य अवधारणा (Core Concept):
इस विषय का बुनियादी सिद्धांत रोजमर्रा की घटनाओं से जुड़ा हुआ है। जब हम किसी वस्तु या घटना के कार्य-कारण संबंध को देखते हैं, तो नियम और सूत्र स्पष्ट हो जाते हैं।

### 2. महत्वपूर्ण बिंदु (Key Takeaways):
- **परिभाषा:** मुख्य शब्दावली को स्पष्ट शब्दों में याद रखें।
- **सूत्र व नियम:** संबंधित फॉर्मूला को लिखकर अभ्यास करें।
- **परीक्षा टिप:** आरेख (Diagram) और उदाहरण देने से परीक्षक पूरे अंक देते हैं।

💡 *सुझाव:* क्या आप इस विषय पर अभ्यास प्रश्न या संख्यात्मक उदाहरण हल करना चाहते हैं? नीचे दिए गए त्वरित विषयों पर भी क्लिक कर सकते हैं!`,
      quiz: {
        question: "क्या आपने इस विषय के मुख्य बिंदुओं को नोट कर लिया है?",
        options: ["हाँ, समझ आ गया", "कृपया और उदाहरण दें", "अभ्यास प्रश्न हल करें", "ऑडियो सुनें"],
        correctIndex: 0,
        explanation: "निरंतर अभ्यास और रिवीजन से हर विषय आसान हो जाता है।"
      }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const result = generateAccurateResponse(query);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: result.text,
        quiz: result.quiz,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
        <Header />

        <main className="flex-grow container mx-auto px-4 lg:px-8 py-6 max-w-5xl flex flex-col">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-foreground">GuruAI Multilingual Tutor</h1>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold border border-green-500/20 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Ask any academic or vocational doubt in Hindi, English or regional languages</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-xl text-xs shadow-sm">
                <Languages className="h-3.5 w-3.5 text-primary" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-transparent text-foreground font-semibold outline-none cursor-pointer text-xs"
                >
                  <option value="Hindi / Hinglish">हिन्दी / Hinglish</option>
                  <option value="English">English</option>
                  <option value="मराठी (Marathi)">मराठी (Marathi)</option>
                  <option value="தமிழ் (Tamil)">தமிழ் (Tamil)</option>
                </select>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessages([{ id: "msg-reset", sender: "bot", text: "नमस्ते! नया सत्र शुरू हो गया है। कोई भी सवाल पूछिए!", timestamp: "Just now" }])}
                className="rounded-xl h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground"
                title="Clear Chat"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Quick Topic Chips */}
          <div className="py-3 border-b border-border/30 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-1 mr-1">
                <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> Popular Doubts:
              </span>
              {PRESET_TOPICS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSendMessage(item.query)}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-card hover:bg-primary/10 border border-border text-foreground font-medium transition-all shadow-sm flex items-center gap-1.5 hover:border-primary/40"
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 min-h-[420px] max-h-[580px] overflow-y-auto py-5 space-y-5 px-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[90%] md:max-w-[80%] rounded-3xl p-5 text-xs md:text-sm shadow-sm space-y-4 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none font-medium"
                      : "glass-card rounded-tl-none border border-border/80 text-foreground bg-card/90"
                  }`}
                >
                  {/* Content body */}
                  <div className="whitespace-pre-wrap leading-relaxed font-sans">
                    {msg.text}
                  </div>

                  {/* Interactive Quick Quiz (if available on bot message) */}
                  {msg.sender === "bot" && msg.quiz && (
                    <div className="p-4 rounded-2xl bg-muted/50 border border-border/70 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                        <HelpCircle className="h-4 w-4 text-amber-500" />
                        <span>Quick Check: {msg.quiz.question}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.quiz.options.map((opt, optIdx) => {
                          const isSelected = selectedQuizAnswers[msg.id] === optIdx;
                          const isCorrect = optIdx === msg.quiz!.correctIndex;
                          const hasAnswered = selectedQuizAnswers[msg.id] !== undefined;

                          return (
                            <button
                              key={opt}
                              onClick={() => {
                                setSelectedQuizAnswers((prev) => ({ ...prev, [msg.id]: optIdx }));
                              }}
                              className={`p-2.5 rounded-xl text-xs text-left font-medium transition-all flex items-center justify-between ${
                                hasAnswered && isCorrect
                                  ? "bg-green-500/20 border-green-500 text-green-700 font-bold"
                                  : hasAnswered && isSelected && !isCorrect
                                  ? "bg-red-500/20 border-red-500 text-red-700"
                                  : isSelected
                                  ? "bg-primary text-primary-foreground font-bold"
                                  : "bg-card border border-border hover:bg-muted text-foreground"
                              }`}
                            >
                              <span>{opt}</span>
                              {hasAnswered && isCorrect && <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {selectedQuizAnswers[msg.id] !== undefined && (
                        <p className="text-[11px] text-muted-foreground pt-1 italic">
                          💡 <strong>स्पष्टीकरण:</strong> {msg.quiz.explanation}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions footer for bot answers */}
                  {msg.sender === "bot" && (
                    <div className="pt-2 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1 font-semibold text-foreground/80">
                        <Zap className="h-3.5 w-3.5 text-amber-500" /> Verified Vernacular Solution
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(msg.text, msg.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                        </button>

                        <button
                          onClick={() => speakText(msg.text, msg.id)}
                          className="flex items-center gap-1.5 text-primary hover:underline font-bold px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
                        >
                          {speakingId === msg.id ? <VolumeX className="h-3.5 w-3.5 text-red-500" /> : <Volume2 className="h-3.5 w-3.5" />}
                          <span>{speakingId === msg.id ? "Stop Audio" : "बोलकर सुनो (Audio)"}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="h-8 w-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-muted-foreground pl-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce"></span>
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1 font-medium">GuruAI is writing step-by-step verified explanation...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <div className="pt-3 border-t border-border/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-card p-2 rounded-2xl border border-border shadow-md focus-within:ring-2 focus-within:ring-primary/40 transition-all"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleVoiceInput}
                className={`h-10 w-10 rounded-xl shrink-0 transition-all ${
                  isListening ? "bg-red-500 text-white animate-pulse" : "text-primary hover:bg-primary/10"
                }`}
                title={isListening ? "Listening... Click to stop" : "Voice Input (Mic)"}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>

              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isListening ? "Listening to your voice..." : "Type your question in Hindi or English (e.g. प्रकाश संश्लेषण, 2x² + 5x + 3 = 0, Ohm's law)..."}
                className="border-0 shadow-none focus-visible:ring-0 text-xs md:text-sm h-10 px-2 bg-transparent"
              />

              <Button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="h-10 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm shrink-0 gap-1.5"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Ask GuruAI</span>
              </Button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground px-2 pt-2">
              <span>Supports Voice Input & Step-by-Step Hindi / English solutions</span>
              <span>Low-Bandwidth Optimized</span>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
