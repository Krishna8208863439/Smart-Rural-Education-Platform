"use client";

import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Download, 
  CheckCircle2, 
  PlayCircle, 
  PauseCircle,
  Clock, 
  Star, 
  Sparkles, 
  WifiOff, 
  FileText, 
  X, 
  Award, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Image as ImageIcon,
  Check,
  Printer,
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  Calculator,
  HelpCircle,
  Trophy,
  Flame,
  CheckCheck
} from "lucide-react";
import { useDataStore } from "@/lib/data-store";

interface QuizItem {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface NoteSection {
  title: string;
  content: string[];
  formula?: string;
  example?: {
    problem: string;
    solution: string;
  };
}

interface LectureSlide {
  id: string;
  title: string;
  titleHi: string;
  timeRangeSec: [number, number];
  timeLabel: string;
  captionHi: string;
  captionEn: string;
  visualType: string;
  tags: string[];
}

interface Chapter {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  summary: string;
  slides: LectureSlide[];
  detailedNotes: NoteSection[];
  quiz: QuizItem[];
}

interface Course {
  id: string;
  title: string;
  titleHi: string;
  subject: string;
  grade: string;
  language: string;
  duration: string;
  rating: number;
  enrolled: string;
  isOfflineAvailable: boolean;
  isDownloaded?: boolean;
  description: string;
  chapters: Chapter[];
  tags: string[];
}

const COURSES_DATA: Course[] = [
  {
    id: "sc-10-01",
    title: "Class 10 Science: Light - Reflection & Refraction",
    titleHi: "कक्षा 10 विज्ञान: प्रकाश - परावर्तन तथा अपवर्तन",
    subject: "Science",
    grade: "Class 10",
    language: "Hindi / Hinglish",
    duration: "4.5 Hours",
    rating: 4.9,
    enrolled: "14,200+",
    isOfflineAvailable: true,
    description: "Complete NCERT concepts with animated ray diagrams, spherical mirrors, lens formulas, Snell's law, and step-by-step problem solving.",
    chapters: [
      {
        id: "sc-ch-1",
        title: "1. प्रकाश का परावर्तन और नियम (Laws of Reflection)",
        duration: "15:00",
        durationSeconds: 900,
        summary: "जब प्रकाश की किरण किसी समतल दर्पण से टकराती है, तो आपतन कोण (∠i) हमेशा परावर्तन कोण (∠r) के बराबर होता है।",
        slides: [
          {
            id: "s-1-1",
            title: "Scene 1: दैनिक जीवन में परावर्तन (Real-life Reflection)",
            titleHi: "दैनिक जीवन में प्रकाश का परावर्तन",
            timeRangeSec: [0, 220],
            timeLabel: "00:00 - 03:40",
            captionHi: "हम वस्तुओं को तभी देख पाते हैं जब उन पर पड़ने वाला प्रकाश परावर्तित होकर हमारी आँखों तक पहुँचता है। दर्पण, शांत पानी और चमकदार सतहें प्रकाश को परावर्तित करती हैं।",
            captionEn: "We see objects when light bouncing off them enters our eyes. Mirrors and smooth water surfaces reflect light rays regularily.",
            visualType: "reflection-daily",
            tags: ["Real World", "Human Eye", "Mirror"]
          },
          {
            id: "s-1-2",
            title: "Scene 2: परावर्तन के नियम व किरण आरेख (Ray Diagram & Laws)",
            titleHi: "परावर्तन के दो मौलिक नियम (∠i = ∠r)",
            timeRangeSec: [221, 450],
            timeLabel: "03:41 - 07:30",
            captionHi: "परावर्तन का नियम: आपतित किरण, परावर्तित किरण और अभिलंब एक ही तल में होते हैं और आपतन कोण (∠i) = परावर्तन कोण (∠r) होता है।",
            captionEn: "Law of Reflection: Angle of incidence (∠i) is always equal to angle of reflection (∠r), and all rays lie in the same plane.",
            visualType: "reflection-ray",
            tags: ["Law 1 & 2", "Angles", "Ray Trace"]
          },
          {
            id: "s-1-3",
            title: "Scene 3: नियमित बनाम विसरित परावर्तन (Specular vs Diffused)",
            titleHi: "चिकनी सतह बनाम खुरदरी सतह पर प्रकाश का बिखराव",
            timeRangeSec: [451, 680],
            timeLabel: "07:31 - 11:20",
            captionHi: "समतल दर्पण पर नियमित परावर्तन से स्पष्ट प्रतिबिम्ब बनता है, जबकि खुरदरी दीवार पर विसरित परावर्तन से प्रकाश चारों दिशाओं में फैलता है।",
            captionEn: "Smooth surfaces cause specular reflection forming clear images, while rough surfaces diffuse light in all directions.",
            visualType: "reflection-specular",
            tags: ["Diffuse", "Specular", "Surface Texture"]
          },
          {
            id: "s-1-4",
            title: "Scene 4: समतल दर्पण में प्रतिबिम्ब की विशेषताएँ (Image Properties)",
            titleHi: "समतल दर्पण में आभासी व पार्श्व उल्टा प्रतिबिम्ब",
            timeRangeSec: [681, 900],
            timeLabel: "11:21 - 15:00",
            captionHi: "समतल दर्पण में प्रतिबिम्ब आभासी, सीधा, वस्तु के बराबर आकार का और उतनी ही दूरी पर पीछे बनता है जितना वस्तु आगे होती है।",
            captionEn: "Images in a plane mirror are virtual, erect, equal in size to the object, and laterally inverted (left appears right).",
            visualType: "reflection-mirror-props",
            tags: ["Lateral Inversion", "Virtual Image", "Distance"]
          }
        ],
        detailedNotes: [
          {
            title: "1. प्रकाश की प्रकृति एवं परावर्तन की परिभाषा (Nature of Light & Reflection)",
            content: [
              "प्रकाश ऊर्जा का एक रूप है जो हमें वस्तुओं को देखने की संवेदनशीलता प्रदान करता है। निर्वात में प्रकाश की चाल 3 × 10⁸ m/s होती है।",
              "परावर्तन (Reflection): जब प्रकाश की किरण किसी माध्यम से चलकर किसी चमकदार या पॉलिशदार सतह (जैसे समतल दर्पण) से टकराकर उसी माध्यम में वापस लौटती है, तो इस परिघटना को प्रकाश का परावर्तन कहते हैं।"
            ]
          },
          {
            title: "2. प्रकाश के परावर्तन के दो नियम (Laws of Reflection)",
            content: [
              "प्रथम नियम: आपतित किरण (Incident Ray), परावर्तित किरण (Reflected Ray) तथा आपतन बिंदु पर खींचा गया अभिलंब (Normal) तीनों एक ही तल में स्थित होते हैं।",
              "द्वितीय नियम: आपतन कोण (Angle of Incidence, ∠i) का मान सदैव परावर्तन कोण (Angle of Reflection, ∠r) के बराबर होता है।"
            ],
            formula: "∠i = ∠r (आपतन कोण = परावर्तन कोण)"
          },
          {
            title: "3. समतल दर्पण द्वारा बने प्रतिबिम्ब की 5 प्रमुख विशेषताएँ (Plane Mirror Properties)",
            content: [
              "1. प्रतिबिम्ब सदैव आभासी (Virtual) तथा सीधा (Erect) होता है (इसे पर्दे पर प्राप्त नहीं किया जा सकता)।",
              "2. प्रतिबिम्ब का आकार वस्तु (बिम्ब) के आकार के ठीक बराबर होता है।",
              "3. प्रतिबिम्ब दर्पण के पीछे उतनी ही दूरी पर बनता है जितनी दूरी पर वस्तु दर्पण के सामने रखी होती है।",
              "4. पार्श्व उत्क्रमण (Lateral Inversion): वस्तु का दायाँ भाग प्रतिबिम्ब में बायाँ तथा बायाँ भाग दायाँ दिखाई देता है।",
              "5. समतल दर्पण की फोकस दूरी अनंत (∞) होती है तथा आवर्धन m = +1 होता है।"
            ]
          },
          {
            title: "4. हल किया गया संख्यात्मक प्रश्न (Solved NCERT Numerical)",
            content: [
              "बोर्ड परीक्षा के लिए महत्वपूर्ण उदाहरण:"
            ],
            example: {
              problem: "यदि एक प्रकाश किरण समतल दर्पण की सतह के साथ 30° का कोण बनाते हुए आपतित होती है, तो परावर्तन कोण (∠r) का मान ज्ञात कीजिए।",
              solution: "हल:\nदर्पण की सतह और अभिलंब के बीच का कोण = 90°\nआपतन कोण (∠i) = 90° - 30° = 60°\nपरावर्तन के नियमानुसार: ∠r = ∠i = 60°\nउत्तर: परावर्तन कोण का मान 60° होगा।"
            }
          }
        ],
        quiz: [
          {
            question: "यदि आपतन कोण (∠i) का मान 40° हो, तो परावर्तन कोण (∠r) कितना होगा?",
            options: ["40°", "80°", "0°", "50°"],
            correct: 0,
            explanation: "परावर्तन के नियम के अनुसार ∠i = ∠r, अतः ∠r = 40° होगा।"
          },
          {
            question: "समतल दर्पण द्वारा बना प्रतिबिम्ब कैसा होता है?",
            options: ["वास्तविक और उल्टा", "आभासी और सीधा", "उल्टा और बड़ा", "वास्तविक और सीधा"],
            correct: 1,
            explanation: "समतल दर्पण हमेशा आभासी (Virtual) तथा सीधा (Erect) प्रतिबिम्ब बनाता है।"
          },
          {
            question: "समतल दर्पण का आवर्धन (Magnification 'm') कितना होता है?",
            options: ["m = 0", "m = +1", "m = -1", "m = अनंत (∞)"],
            correct: 1,
            explanation: "चूँकि प्रतिबिम्ब वस्तु के बराबर आकार का और सीधा बनता है, इसलिए समतल दर्पण का आवर्धन m = +1 होता है।"
          },
          {
            question: "यदि कोई वस्तु समतल दर्पण से 15 cm की दूरी पर रखी है, तो वस्तु और उसके प्रतिबिम्ब के बीच की कुल दूरी क्या होगी?",
            options: ["15 cm", "30 cm", "0 cm", "45 cm"],
            correct: 1,
            explanation: "दर्पण के पीछे प्रतिबिम्ब 15 cm पर बनेगा। अतः वस्तु व प्रतिबिम्ब के बीच की कुल दूरी = 15 + 15 = 30 cm होगी।"
          },
          {
            question: "पार्श्व परिवर्तन (Lateral Inversion) का क्या अर्थ है?",
            options: ["प्रतिबिम्ब का उल्टा हो जाना", "वस्तु का दायाँ भाग प्रतिबिम्ब में बायाँ दिखना", "रंग बदल जाना", "प्रतिबिम्ब का गायब होना"],
            correct: 1,
            explanation: "पार्श्व परिवर्तन में समतल दर्पण में दायाँ भाग बायाँ तथा बायाँ भाग दायाँ दिखाई देता है।"
          }
        ]
      },
      {
        id: "sc-ch-2",
        title: "2. गोलीय दर्पण: अवतल और उत्तल दर्पण (Concave & Convex)",
        duration: "18:00",
        durationSeconds: 1080,
        summary: "अवतल दर्पण प्रकाश को फोकस पर केंद्रित करता है जबकि उत्तल दर्पण विस्तृत क्षेत्र दिखाता है।",
        slides: [
          {
            id: "s-2-1",
            title: "Scene 1: अवतल दर्पण का फोकस अभिसरण (Concave Convergence)",
            titleHi: "अवतल दर्पण (Concave Mirror) — किरणों का फोकस पर मिलना",
            timeRangeSec: [0, 360],
            timeLabel: "00:00 - 06:00",
            captionHi: "अवतल दर्पण मुख्य अक्ष के समानांतर आने वाली सभी प्रकाश किरणों को परावर्तन के पश्चात मुख्य फोकस (F) पर केंद्रित करता है।",
            captionEn: "A concave mirror converges all parallel incident rays to a single point called the Principal Focus (F).",
            visualType: "mirror-concave",
            tags: ["Concave", "Focus F", "Converging"]
          },
          {
            id: "s-2-2",
            title: "Scene 2: उत्तल दर्पण व रियर-व्यू मिरर (Convex Mirror Divergence)",
            titleHi: "उत्तल दर्पण (Convex Mirror) — विस्तृत दृष्टि क्षेत्र",
            timeRangeSec: [361, 720],
            timeLabel: "06:01 - 12:00",
            captionHi: "उत्तल दर्पण किरणों को अपसारित करता है और हमेशा सीधा व छोटा प्रतिबिम्ब बनाता है, इसलिए वाहनों में पीछे का ट्रैफिक देखने के लिए यह उपयुक्त है।",
            captionEn: "A convex mirror diverges light rays and always forms an erect, diminished virtual image, providing a wide rear view.",
            visualType: "mirror-convex",
            tags: ["Convex", "Rear View", "Diverging"]
          },
          {
            id: "s-2-3",
            title: "Scene 3: दर्पण सूत्र एवं आवर्धन (Mirror Formula & Magnification)",
            titleHi: "दर्पण सूत्र 1/f = 1/v + 1/u तथा m = -v/u",
            timeRangeSec: [721, 1080],
            timeLabel: "12:01 - 18:00",
            captionHi: "दर्पण सूत्र द्वारा बिम्ब की दूरी (u), प्रतिबिम्ब की दूरी (v) और फोकस दूरी (f) का सटीक मान ज्ञात किया जाता है।",
            captionEn: "The mirror formula relates focal length f, object distance u, and image distance v for optical calculations.",
            visualType: "mirror-formula",
            tags: ["Formula", "1/f = 1/v + 1/u", "Magnification"]
          }
        ],
        detailedNotes: [
          {
            title: "1. गोलीय दर्पण के प्रमुख पद (Key Terminology)",
            content: [
              "ध्रुव (Pole, P): गोलीय दर्पण के परावर्तक पृष्ठ के केंद्र को ध्रुव कहते हैं।",
              "वक्रता केंद्र (Center of Curvature, C): गोलीय दर्पण जिस खोखले गोले का भाग होता है, उसके केंद्र को वक्रता केंद्र कहते हैं।",
              "मुख्य अक्ष (Principal Axis): ध्रुव P और वक्रता केंद्र C को मिलाने वाली सीधी रेखा।",
              "फोकस दूरी (Focal Length, f): ध्रुव P और मुख्य फोकस F के बीच की दूरी। संबंध: f = R / 2।"
            ],
            formula: "R = 2f (वक्रता त्रिज्या = 2 × फोकस दूरी)"
          },
          {
            title: "2. अवतल दर्पण व उत्तल दर्पण के उपयोग (Applications)",
            content: [
              "अवतल दर्पण (Concave): टॉर्च, सर्चलाइट, गाड़ियों की हेडलाइट में समानांतर किरण पुंज प्राप्त करने के लिए; दंत चिकित्सकों द्वारा दाँत का बड़ा प्रतिबिम्ब देखने के लिए; सौर भट्टियों (Solar Cooker) में सूर्य की किरणों को केंद्रित करने के लिए।",
              "उत्तल दर्पण (Convex): वाहनों के पश्च-दृश्य दर्पण (Rear-view mirror) के रूप में, क्योंकि यह सदैव सीधा तथा छोटा प्रतिबिम्ब बनाता है और चालक को बहुत बड़ा दृष्टि क्षेत्र प्रदान करता है।"
            ]
          },
          {
            title: "3. दर्पण सूत्र एवं आवर्धन (Mirror Formula & Magnification)",
            content: [
              "गोलीय दर्पणों के लिए बिम्ब दूरी (u), प्रतिबिम्ब दूरी (v) और फोकस दूरी (f) का संबंध दर्पण सूत्र कहलाता है।",
              "नई कार्तीय चिह्न परिपाटी (Sign Convention): आपतित प्रकाश की दिशा में दूरियाँ धनात्मक (+) तथा विपरीत दिशा में ऋणात्मक (-) ली जाती हैं। बिम्ब दूरी u सदैव ऋणात्मक (-u) होती है।"
            ],
            formula: "1/f = 1/v + 1/u  तथा  m = h'/h = -v/u",
            example: {
              problem: "एक अवतल दर्पण की फोकस दूरी 15 cm है। दर्पण से 30 cm की दूरी पर रखी वस्तु का प्रतिबिम्ब कहाँ बनेगा?",
              solution: "दिया है: f = -15 cm, u = -30 cm\nदर्पण सूत्र: 1/f = 1/v + 1/u ➔ 1/v = 1/f - 1/u\n1/v = 1/(-15) - 1/(-30) = -2/30 + 1/30 = -1/30\nv = -30 cm\nउत्तर: प्रतिबिम्ब दर्पण के सामने 30 cm पर (वक्रता केंद्र C पर) वास्तविक व उल्टा बनेगा।"
            }
          }
        ],
        quiz: [
          {
            question: "वाहनों में पीछे का ट्रैफिक देखने के लिए कौन सा दर्पण प्रयोग किया जाता है?",
            options: ["समतल दर्पण", "अवतल दर्पण", "उत्तल दर्पण (Convex)", "अवतल लेंस"],
            correct: 2,
            explanation: "उत्तल दर्पण हमेशा सीधा, छोटा प्रतिबिम्ब बनाता है और विस्तृत दृश्य क्षेत्र (Field of View) देता है।"
          },
          {
            question: "यदि किसी गोलीय दर्पण की वक्रता त्रिज्या (R) 30 cm हो, तो उसकी फोकस दूरी (f) क्या होगी?",
            options: ["60 cm", "15 cm", "30 cm", "10 cm"],
            correct: 1,
            explanation: "f = R / 2 = 30 / 2 = 15 cm।"
          },
          {
            question: "दर्पण सूत्र (Mirror Formula) निम्न में से कौन सा है?",
            options: ["1/f = 1/v + 1/u", "1/f = 1/v - 1/u", "f = u + v", "v = u × f"],
            correct: 0,
            explanation: "दर्पण सूत्र 1/f = 1/v + 1/u होता है।"
          },
          {
            question: "दंत चिकित्सक (Dentist) रोगी के दाँतों का बड़ा प्रतिबिम्ब देखने के लिए किस दर्पण का उपयोग करते हैं?",
            options: ["उत्तल दर्पण", "अवतल दर्पण (Concave)", "समतल दर्पण", "उत्तल लेंस"],
            correct: 1,
            explanation: "अवतल दर्पण फोकस और ध्रुव के बीच रखी वस्तु का सीधा और आवर्धित (बड़ा) आभासी प्रतिबिम्ब बनाता है।"
          },
          {
            question: "अवतल दर्पण के वक्रता केंद्र (C) पर रखी वस्तु का प्रतिबिम्ब कहाँ बनता है?",
            options: ["फोकस F पर", "अनंत पर", "वक्रता केंद्र C पर ही (समान आकार)", "दर्पण के पीछे"],
            correct: 2,
            explanation: "वक्रता केंद्र C पर रखी वस्तु का प्रतिबिम्ब C पर ही वास्तविक, उल्टा और समान आकार का बनता है।"
          }
        ]
      },
      {
        id: "sc-ch-3",
        title: "3. प्रकाश का अपवर्तन एवं स्नेल का नियम (Snell's Law)",
        duration: "20:00",
        durationSeconds: 1200,
        summary: "जब प्रकाश एक माध्यम से दूसरे माध्यम में प्रवेश करता है तो वह अपने मूल पथ से मुड़ जाता है।",
        slides: [
          {
            id: "s-3-1",
            title: "Scene 1: पानी में पेंसिल का मुड़ा दिखना (Refraction in Water)",
            titleHi: "अपवर्तन का व्यावहारिक उदाहरण — पानी में मुड़ी पेंसिल",
            timeRangeSec: [0, 400],
            timeLabel: "00:00 - 06:40",
            captionHi: "जब पानी के अंदर पेंसिल से आने वाली प्रकाश किरणें हवा में प्रवेश करती हैं, तो वे अभिलंब से दूर मुड़ती हैं, जिससे पेंसिल टूटी या मुड़ी दिखाई देती है।",
            captionEn: "Light rays coming from the pencil underwater bend away from normal when entering air, making it appear bent.",
            visualType: "refraction-pencil",
            tags: ["Water Glass", "Real Depth vs Apparent"]
          },
          {
            id: "s-3-2",
            title: "Scene 2: कांच की सिल्ली से अपवर्तन (Glass Slab Refraction)",
            titleHi: "कांच के गुटके से पार्श्व विस्थापन (Lateral Shift)",
            timeRangeSec: [401, 800],
            timeLabel: "06:41 - 13:20",
            captionHi: "कांच की सिल्ली में प्रवेश करते समय किरण अभिलंब की ओर झुकती है और बाहर निकलते समय दूर हटती है। निर्गत किरण आपतित किरण के समानांतर होती है।",
            captionEn: "As light enters and exits a rectangular glass slab, it bends twice, emerging parallel to the incident ray with a lateral shift.",
            visualType: "refraction-slab",
            tags: ["Glass Slab", "Lateral Shift", "Emergent Ray"]
          },
          {
            id: "s-3-3",
            title: "Scene 3: स्नेल का नियम व अपवर्तनांक (Snell's Law & Refractive Index)",
            titleHi: "स्नेल का नियम: sin(i) / sin(r) = n",
            timeRangeSec: [801, 1200],
            timeLabel: "13:21 - 20:00",
            captionHi: "किन्हीं दो निश्चित माध्यमों के लिए आपतन कोण की ज्या (sin i) और अपवर्तन कोण की ज्या (sin r) का अनुपात सदैव स्थिर रहता है।",
            captionEn: "Snell's Law states that the ratio of sin(i) to sin(r) is constant for a given pair of media, representing refractive index n.",
            visualType: "refraction-snell",
            tags: ["Snell's Law", "n = c/v", "Formula"]
          }
        ],
        detailedNotes: [
          {
            title: "1. प्रकाश के अपवर्तन का कारण (Cause of Refraction)",
            content: [
              "जब प्रकाश एक पारदर्शी माध्यम से दूसरे पारदर्शी माध्यम में प्रवेश करता है, तो दोनों माध्यमों में प्रकाश की चाल (Speed of Light) अलग-अलग होने के कारण प्रकाश की किरण अपने मार्ग से विचलित हो जाती है।",
              "नियम 1: जब प्रकाश विरल माध्यम (Rarer) से सघन माध्यम (Denser) जैसे हवा से कांच में जाता है, तो यह अभिलंब की ओर झुकता है।",
              "नियम 2: जब प्रकाश सघन से विरल (कांच से हवा) में जाता है, तो यह अभिलंब से दूर हटता है।"
            ]
          },
          {
            title: "2. स्नेल का नियम एवं अपवर्तनांक (Snell's Law & Refractive Index)",
            content: [
              "स्नेल का नियम: प्रकाश के किसी दिए गए रंग तथा दिए गए माध्यमों के युग्म के लिए आपतन कोण की ज्या (sin i) और अपवर्तन कोण की ज्या (sin r) का अनुपात स्थिर (Constant) रहता है।",
              "निरपेक्ष अपवर्तनांक (n): निर्वात में प्रकाश की चाल (c) और माध्यम में प्रकाश की चाल (v) का अनुपात n = c / v होता है।",
              "हीरे का अपवर्तनांक सर्वाधिक (2.42) होता है, जिसका अर्थ है कि हीरे में प्रकाश की चाल निर्वात की तुलना में 1/2.42 गुनी रह जाती है।"
            ],
            formula: "sin(i) / sin(r) = n₂ / n₁  तथा  n = c / v"
          },
          {
            title: "3. लेंस सूत्र एवं लेंस की क्षमता (Lens Formula & Power of Lens)",
            content: [
              "गोलीय लेंसों के लिए लेंस सूत्र: 1/f = 1/v - 1/u",
              "लेंस की क्षमता (P): किसी लेंस द्वारा प्रकाश किरणों को अभिसरित या अपसारित करने की मात्रा को लेंस की क्षमता कहते हैं। यह फोकस दूरी का व्युत्क्रम होती है: P = 1 / f (मीटर में)। मात्रक: डायोप्टर (Dioptre, D)।",
              "उत्तल लेंस की क्षमता धनात्मक (+) तथा अवतल लेंस की क्षमता ऋणात्मक (-) होती है।"
            ],
            formula: "1/f = 1/v - 1/u  तथा  P = 1/f (metre) = 100/f (cm) Dioptre",
            example: {
              problem: "एक उत्तल लेंस की फोकस दूरी +50 cm है। इस लेंस की क्षमता (Power) ज्ञात कीजिए।",
              solution: "दिया है: f = +50 cm = +0.5 m\nलेंस क्षमता सूत्र: P = 1 / f(m)\nP = 1 / (+0.5) = +2.0 Dioptre (+2D)\nउत्तर: लेंस की क्षमता +2D होगी।"
            }
          }
        ],
        quiz: [
          {
            question: "स्नेल के नियम का गणितीय सूत्र कौन सा है?",
            options: ["sin(i) × sin(r) = n", "sin(i) / sin(r) = n", "V = IR", "F = ma"],
            correct: 1,
            explanation: "स्नेल का नियम है sin(i) / sin(r) = n (माध्यम का अपवर्तनांक)।"
          },
          {
            question: "पानी में डूबी हुई सीधी पेंसिल अपवर्तन के कारण कैसी प्रतीत होती है?",
            options: ["सीधी और लंबी", "सतह पर मुड़ी हुई", "अदृश्य", "काली"],
            correct: 1,
            explanation: "पानी से हवा में प्रकाश निकलते समय अभिलंब से दूर मुड़ता है, जिससे पेंसिल पानी की सतह पर मुड़ी हुई दिखाई देती है।"
          },
          {
            question: "हीरे (Diamond) का अपवर्तनांक 2.42 है। इसका क्या अर्थ है?",
            options: ["हीरे में प्रकाश की चाल सबसे तेज है", "हीरे में प्रकाश की चाल निर्वात की चाल की 1/2.42 गुनी है", "हीरा प्रकाश को रोक लेता है", "हीरे का भार 2.42 ग्राम है"],
            correct: 1,
            explanation: "अपवर्तनांक n = c/v होने के कारण हीरे में प्रकाश की चाल निर्वात की तुलना में 2.42 गुना धीमी हो जाती है।"
          },
          {
            question: "लेंस की क्षमता (Power of Lens) का SI मात्रक क्या है?",
            options: ["मीटर (m)", "डायोप्टर (Dioptre, D)", "जूल (J)", "वाट (W)"],
            correct: 1,
            explanation: "लेंस की क्षमता का SI मात्रक डायोप्टर (D) होता है, जहाँ 1 D = 1 m⁻¹।"
          },
          {
            question: "लेंस सूत्र (Lens Formula) निम्न में से कौन सा है?",
            options: ["1/f = 1/v + 1/u", "1/f = 1/v - 1/u", "f = v - u", "1/f = v / u"],
            correct: 1,
            explanation: "लेंस सूत्र 1/f = 1/v - 1/u होता है (दर्पण सूत्र में + तथा लेंस सूत्र में - का अंतर होता है)।"
          }
        ]
      }
    ],
    tags: ["NCERT", "CBSE", "State Board"]
  },
  {
    id: "math-09-02",
    title: "Class 9 Mathematics: Number Systems & Polynomials",
    titleHi: "कक्षा 9 गणित: संख्या पद्धति और बहुपद",
    subject: "Mathematics",
    grade: "Class 9",
    language: "Hindi",
    duration: "6 Hours",
    rating: 4.8,
    enrolled: "18,900+",
    isOfflineAvailable: true,
    description: "Master rational/irrational numbers, algebraic identities, factorization, and quadratic formulas.",
    chapters: [
      {
        id: "math-ch-1",
        title: "1. परिमेय संख्याएँ और बहुपद (Polynomials & Numbers)",
        duration: "16:00",
        durationSeconds: 960,
        summary: "बीजीय व्यंजक जिनमें चर की घात पूर्ण संख्या हो, बहुपद कहलाते हैं।",
        slides: [
          {
            id: "s-m-1",
            title: "Scene 1: सर्वसमिका (a + b)² का ज्यामितीय प्रमाण",
            titleHi: "क्षेत्रफल विधि से (a + b)² = a² + 2ab + b² का सत्यापन",
            timeRangeSec: [0, 480],
            timeLabel: "00:00 - 08:00",
            captionHi: "एक बड़े वर्ग जिसकी भुजा (a + b) है, उसका कुल क्षेत्रफल चार भागों: a² + ab + ab + b² के जोड़ के बराबर होता है।",
            captionEn: "A square with side (a+b) breaks down geometrically into 4 area regions: a², two rectangles of ab, and b².",
            visualType: "math-identities",
            tags: ["Algebra", "Geometric Proof", "(a+b)²"]
          },
          {
            id: "s-m-2",
            title: "Scene 2: द्विघात समीकरण का ग्राफ और मूल (Parabola & Roots)",
            titleHi: "द्विघात समीकरण 2x² + 5x + 3 = 0 के मूल (Roots)",
            timeRangeSec: [481, 960],
            timeLabel: "08:01 - 16:00",
            captionHi: "द्विघात समीकरण का आरेख एक परवलय होता है जो x-अक्ष को मूलों (x = -1 तथा x = -1.5) पर काटता है।",
            captionEn: "The graph of a quadratic equation forms a parabola crossing the x-axis at its solution roots x = -1 and x = -1.5.",
            visualType: "math-roots",
            tags: ["Parabola", "Roots x=-1, -1.5", "Graph"]
          }
        ],
        detailedNotes: [
          {
            title: "1. संख्या पद्धति का वर्गीकरण (Number Systems)",
            content: [
              "प्राकृत संख्याएँ (Natural Numbers, N): 1, 2, 3, 4...",
              "पूर्ण संख्याएँ (Whole Numbers, W): 0, 1, 2, 3...",
              "पूर्णांक (Integers, Z): ...-3, -2, -1, 0, 1, 2, 3...",
              "परिमेय संख्याएँ (Rational Numbers, Q): जिन्हें p/q के रूप में व्यक्त किया जा सकता है (q ≠ 0 और p, q पूर्णांक हैं)। इनका दशमलव प्रसार शांत (Terminating) या अनवसानी आवर्ती (Non-terminating recurring) होता है।",
              "अपरिमेय संख्याएँ (Irrational Numbers): जिन्हें p/q के रूप में नहीं लिखा जा सकता (जैसे √2, √3, √5, π)। इनका दशमलव प्रसार अनवसानी अनावर्ती होता है।"
            ]
          },
          {
            title: "2. महत्वपूर्ण बीजीय सर्वसमिकाएँ (Algebraic Identities)",
            content: [
              "1. (a + b)² = a² + 2ab + b²",
              "2. (a - b)² = a² - 2ab + b²",
              "3. a² - b² = (a + b)(a - b)",
              "4. (x + a)(x + b) = x² + (a + b)x + ab",
              "5. (a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ca",
              "6. (a + b)³ = a³ + b³ + 3ab(a + b)",
              "7. (a - b)³ = a³ - b³ - 3ab(a - b)"
            ],
            formula: "(a + b)² = a² + 2ab + b²  तथा  a² - b² = (a+b)(a-b)"
          },
          {
            title: "3. मध्य पद तोड़कर गुणनखंडन (Splitting the Middle Term)",
            content: [
              "द्विघात बहुपद ax² + bx + c के गुणनखंड के लिए ऐसी दो संख्याएँ p और q खोजते हैं जिनका जोड़ p + q = b और गुणनफल p × q = a × c हो।"
            ],
            example: {
              problem: "बहुपद 2x² + 7x + 3 का गुणनखंड कीजिए।",
              solution: "यहाँ a = 2, b = 7, c = 3 ➔ a × c = 6\nऐसी दो संख्याएँ 6 और 1 हैं (6 + 1 = 7 तथा 6 × 1 = 6)\n2x² + 6x + 1x + 3\n= 2x(x + 3) + 1(x + 3)\n= (2x + 1)(x + 3)\nउत्तर: (2x + 1)(x + 3)"
            }
          }
        ],
        quiz: [
          {
            question: "(x + 4)(x - 4) का मान क्या होगा?",
            options: ["x² - 16", "x² + 16", "x² - 8x + 16", "2x - 8"],
            correct: 0,
            explanation: "(a + b)(a - b) = a² - b² सूत्र से (x + 4)(x - 4) = x² - 16।"
          },
          {
            question: "निम्न में से कौन सी एक अपरिमेय संख्या (Irrational Number) है?",
            options: ["4/5", "0.25", "√3", "√16 (जो 4 है)"],
            correct: 2,
            explanation: "√3 का दशमलव मान अशांत अनावर्ती (Non-terminating non-recurring) होता है, अतः यह अपरिमेय है।"
          },
          {
            question: "बहुपद P(x) = 3x - 6 का शून्यक (Zero) क्या है?",
            options: ["x = 0", "x = 2", "x = -2", "x = 6"],
            correct: 1,
            explanation: "3x - 6 = 0 ➔ 3x = 6 ➔ x = 2।"
          },
          {
            question: "(a + b + c)² का सही विस्तार क्या है?",
            options: ["a² + b² + c²", "a² + b² + c² + 2ab + 2bc + 2ca", "a³ + b³ + c³", "2a + 2b + 2c"],
            correct: 1,
            explanation: "(a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ca होता है।"
          },
          {
            question: "द्विघात बहुपद (Quadratic Polynomial) की अधिकतम घात (Degree) कितनी होती है?",
            options: ["1", "2", "3", "अनंत"],
            correct: 1,
            explanation: "द्विघात बहुपद के चर की अधिकतम घात 2 होती है।"
          }
        ]
      }
    ],
    tags: ["Foundation", "Math Practice"]
  },
  {
    id: "agri-tech-01",
    title: "Rural Skill Hub: Smart Drip Irrigation & Soil Health",
    titleHi: "स्मार्ट टपक सिंचाई एवं मृदा स्वास्थ्य तकनीक",
    subject: "Vocational & AgTech",
    grade: "Skill Hub",
    language: "Hindi / Marathi",
    duration: "3.5 Hours",
    rating: 4.95,
    enrolled: "9,450+",
    isOfflineAvailable: true,
    description: "Learn low-cost micro-irrigation maintenance, solar water pump setup, and soil NPK health.",
    chapters: [
      {
        id: "agri-ch-1",
        title: "1. टपक सिंचाई की स्थापना एवं लाभ (Drip Layout & Subsidy)",
        duration: "14:00",
        durationSeconds: 840,
        summary: "ड्रिपर्स और प्लास्टिक पाइपलाइन से सीधे पौधों की जड़ों में बूँद-बूँद पानी पहुँचाने की तकनीक।",
        slides: [
          {
            id: "s-a-1",
            title: "Scene 1: टपक सिंचाई का नेटवर्क आरेख",
            titleHi: "खेत में मुख्य पाइपलाइन, सब-मेन और ड्रिपर्स का जाल",
            timeRangeSec: [0, 420],
            timeLabel: "00:00 - 07:00",
            captionHi: "टपक सिंचाई में पानी सीधे पौधे की जड़ में बूँद-बूँद जाता है, जिससे 70% पानी की बचत होती है और क्यारी में खरपतवार नहीं उगती।",
            captionEn: "Drip irrigation delivers water drop-by-drop directly to the root zone, conserving 70% water and stopping weeds.",
            visualType: "drip-schematic",
            tags: ["Field Layout", "Water Saving", "Roots"]
          },
          {
            id: "s-a-2",
            title: "Scene 2: वेंचुरी फर्टिगेशन व सौर पंप",
            titleHi: "पानी के साथ घुलनशील खाद पहुँचाना (फर्टिगेशन)",
            timeRangeSec: [421, 840],
            timeLabel: "07:01 - 14:00",
            captionHi: "वेंचुरी इंजेक्टर की मदद से पानी के साथ तरल NPK खाद सीधे जड़ों तक पहुँचती है। PM-KUSUM योजना से सोलर पंप पर 60% सब्सिडी मिलती है।",
            captionEn: "Venturi injectors mix liquid NPK nutrients with irrigation water, feeding crops efficiently with solar power.",
            visualType: "drip-fertigation",
            tags: ["Venturi", "NPK Fertilizer", "PM-KUSUM Solar"]
          }
        ],
        detailedNotes: [
          {
            title: "1. टपक सिंचाई (Drip Irrigation) के प्रमुख घटक एवं कार्यविधि",
            content: [
              "टपक सिंचाई (Micro Irrigation) एक ऐसी विधि है जिसमें प्लास्टिक की पार्श्व नलियों (Laterals) और ड्रिपर्स (Emitters) के माध्यम से जल को पौधों के जड़ क्षेत्र (Root Zone) में बूँद-बूँद कर पहुँचाया जाता है।",
              "प्रमुख घटक: 1. जल स्रोत एवं पंप 2. हाइड्रोसाइक्लोन एवं डिस्क/स्क्रीन फिल्टर 3. मुख्य पाइप (Main Line) 4. उप-मुख्य पाइप (Sub-main) 5. ड्रिपर्स 6. वेंचुरी फर्टिगेशन यूनिट।"
            ]
          },
          {
            title: "2. टपक सिंचाई के 4 सबसे बड़े फायदे",
            content: [
              "1. जल संरक्षण: खुले बहाव (Flood Irrigation) की तुलना में 60% से 70% जल की बचत।",
              "2. फसल उत्पादन में वृद्धि: पौधे को निरंतर समान नमी मिलने से पैदावार में 25% से 35% की बढ़ोतरी।",
              "3. खरपतवार नियंत्रण: केवल पौधे की जड़ को पानी मिलता है, बीच की क्यारी सूखी रहने से खरपतवार नहीं पनपती।",
              "4. फर्टिगेशन (Fertigation): पानी के साथ घुलनशील खाद देने से खाद की 40% तक बचत होती है।"
            ]
          },
          {
            title: "3. सरकारी सब्सिडी एवं योजना गाइड (PMKSY & PM-KUSUM)",
            content: [
              "प्रधानमंत्री कृषि सिंचाई योजना (PMKSY): लघु एवं सीमांत किसानों को टपक सिंचाई संयंत्र पर 70% से 80% तक का सरकारी अनुदान (Subsidy) प्रदान किया जाता है।",
              "पीएम कुसुम योजना (PM-KUSUM): खेत में सोलर पंप लगाने के लिए 60% तक की केंद्रीय व राज्य सब्सिडी मिलती है।"
            ]
          }
        ],
        quiz: [
          {
            question: "टपक सिंचाई से सामान्यतः कितने प्रतिशत जल की बचत होती है?",
            options: ["10-20%", "60-70%", "0%", "95%"],
            correct: 1,
            explanation: "टपक सिंचाई सीधे जड़ों को पानी देकर 60-70% तक पानी की बचत करती है।"
          },
          {
            question: "टपक सिंचाई में फिल्टर (Filter) का मुख्य कार्य क्या होता है?",
            options: ["पानी का तापमान बढ़ाना", "मिट्टी व कचरे को छानकर ड्रिपर्स को जाम (Choke) होने से बचाना", "खाद का रंग बदलना", "बिजली बचाना"],
            correct: 1,
            explanation: "फिल्टर पानी से रेत, मिट्टी व काई को छानकर ड्रिपर्स की चोकिंग रोकता है।"
          },
          {
            question: "फर्टिगेशन (Fertigation) किसे कहते हैं?",
            options: ["खेत में कीटनाशक छिड़कना", "सिंचाई जल के साथ घुलनशील खाद (Nutrients) देना", "सूखी खाद फेंकना", "फसल की कटाई करना"],
            correct: 1,
            explanation: "सिंचाई जल के साथ उर्वरकों को घोलकर ड्रिप पाइपों द्वारा जड़ों तक पहुँचाने को फर्टिगेशन कहते हैं।"
          },
          {
            question: "टपक सिंचाई संयंत्र पर लघु किसानों को सरकार द्वारा कितने प्रतिशत तक सब्सिडी मिलती है?",
            options: ["10%", "25%", "70% से 80%", "100%"],
            correct: 2,
            explanation: "PMKSY योजना के तहत लघु व सीमांत किसानों को 70% से 80% तक अनुदान मिलता है।"
          },
          {
            question: "पीएम कुसुम (PM-KUSUM) योजना किस कार्य से संबंधित है?",
            options: ["ट्रैक्टर खरीद", "खेतों में सोलर सिंचाई पंप की स्थापना", "बीज वितरण", "पशुपालन"],
            correct: 1,
            explanation: "PM-KUSUM योजना ग्रामीण क्षेत्रों में सोलर वाटर पंप लगाने और ग्रिड से जोड़ने के लिए सब्सिडी देती है।"
          }
        ]
      }
    ],
    tags: ["Skill India", "AgTech"]
  }
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [offlineOnly, setOfflineOnly] = useState(false);

  // Classroom Modal State
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [classroomTab, setClassroomTab] = useState<"video" | "notes" | "quiz">("video");

  // Video Player Playback State
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(30);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isSpeakingNarration, setIsSpeakingNarration] = useState(false);

  // Quiz State
  const [userQuizAnswers, setUserQuizAnswers] = useState<{ [quizIndex: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Notes Collapsible Sections
  const [expandedNotes, setExpandedNotes] = useState<{ [idx: number]: boolean }>({ 0: true, 1: true, 2: true, 3: true });

  // Offline Download Manager State
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const grades = ["All", "Class 6-8", "Class 9", "Class 10", "Skill Hub"];
  const subjects = ["All", "Science", "Mathematics", "Vocational & AgTech"];

  const activeChapter = activeCourse ? activeCourse.chapters[activeChapterIndex] || activeCourse.chapters[0] : null;

  // Active slide calculation based on current time
  const activeSlideIndex = activeChapter
    ? Math.max(0, activeChapter.slides.findIndex(
        (s) => currentTimeSec >= s.timeRangeSec[0] && currentTimeSec <= s.timeRangeSec[1]
      )) === -1
      ? 0
      : activeChapter.slides.findIndex((s) => currentTimeSec >= s.timeRangeSec[0] && currentTimeSec <= s.timeRangeSec[1])
    : 0;

  const currentSlide = activeChapter ? activeChapter.slides[activeSlideIndex] || activeChapter.slides[0] : null;

  // Timer loop
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && activeCourse && activeChapter) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= activeChapter.durationSeconds) {
            setIsPlaying(false);
            return activeChapter.durationSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeCourse, activeChapter, playbackSpeed]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeChapter) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const pct = Math.max(0, Math.min(1, clickX / width));
    setCurrentTimeSec(Math.floor(pct * activeChapter.durationSeconds));
  };

  const playSlideAudio = (slideText: string) => {
    if (typeof window === "undefined" || isAudioMuted) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(slideText);
      utterance.lang = "hi-IN";
      utterance.rate = playbackSpeed;

      utterance.onend = () => setIsSpeakingNarration(false);
      utterance.onerror = () => setIsSpeakingNarration(false);

      setIsSpeakingNarration(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleTeacherSpeech = () => {
    if (isSpeakingNarration) {
      if (typeof window !== "undefined") window.speechSynthesis.cancel();
      setIsSpeakingNarration(false);
    } else if (currentSlide) {
      playSlideAudio(currentSlide.captionHi);
    }
  };

  const jumpToSlide = (slide: LectureSlide) => {
    setCurrentTimeSec(slide.timeRangeSec[0] + 5);
    setIsPlaying(true);
    playSlideAudio(slide.captionHi);
  };

  const openClassroom = (course: Course) => {
    setActiveCourse(course);
    setActiveChapterIndex(0);
    setClassroomTab("video");
    setIsPlaying(true);
    setCurrentTimeSec(10);
    setUserQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleDownload = (courseId: string) => {
    setDownloadingId(courseId);
    setDownloadProgress(15);
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadingId(null);
          setCourses((prevCourses) =>
            prevCourses.map((c) =>
              c.id === courseId ? { ...c, isDownloaded: true } : c
            )
          );
          return 0;
        }
        return prev + 25;
      });
    }, 200);
  };

  // Calculate Quiz Score
  const calculateScore = () => {
    if (!activeChapter) return { score: 0, total: 0, pct: 0 };
    let correctCount = 0;
    activeChapter.quiz.forEach((q, idx) => {
      if (userQuizAnswers[idx] === q.correct) correctCount++;
    });
    return {
      score: correctCount,
      total: activeChapter.quiz.length,
      pct: Math.round((correctCount / activeChapter.quiz.length) * 100)
    };
  };

  const scoreResult = calculateScore();

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.titleHi.includes(searchQuery) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGrade = selectedGrade === "All" || course.grade === selectedGrade;
    const matchesSubject = selectedSubject === "All" || course.subject === selectedSubject;
    const matchesOffline = !offlineOnly || course.isDownloaded;

    return matchesSearch && matchesGrade && matchesSubject && matchesOffline;
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
        <Header />

        <main className="flex-grow">
          {/* Header Banner */}
          <section className="bg-gradient-to-b from-primary/10 via-background to-background py-10 border-b border-border/50">
            <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Unlocked Course-Wise Notes & Quizzes</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                    Digital Courses, Notes & Chapter Quizzes
                  </h1>
                  <p className="text-muted-foreground text-xs md:text-sm max-w-xl">
                    High-definition video lectures, detailed point-by-point revision notes, and self-assessment chapter tests.
                  </p>
                </div>

                {/* Storage Status */}
                <div className="glass-card p-4 rounded-2xl border border-primary/20 w-full md:w-72 flex flex-col gap-2 bg-card">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5 text-foreground">
                      <WifiOff className="h-4 w-4 text-primary" /> Offline Storage
                    </span>
                    <span className="text-primary font-bold">2.4 GB Free</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-[35%]"></div>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Saved lessons run 100% offline without mobile data.
                  </p>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="mt-6 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="relative md:col-span-8">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search courses (e.g. Science, टपक सिंचाई, Algebra)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-11 rounded-xl bg-card border-border text-sm shadow-sm"
                    />
                  </div>

                  <div className="md:col-span-4">
                    <Button
                      variant={offlineOnly ? "default" : "outline"}
                      className={`h-11 w-full rounded-xl gap-2 text-xs font-semibold ${
                        offlineOnly ? "bg-primary text-primary-foreground" : "bg-card"
                      }`}
                      onClick={() => setOfflineOnly(!offlineOnly)}
                    >
                      <WifiOff className="h-4 w-4" />
                      {offlineOnly ? "Showing Saved Offline" : "Filter Downloaded"}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-semibold text-muted-foreground mr-1">Grade:</span>
                  {grades.map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                      className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                        selectedGrade === grade
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-card border border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Courses Cards Grid */}
          <section className="container mx-auto px-4 lg:px-8 py-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="glass-card rounded-3xl overflow-hidden border border-border flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 bg-card/80 shadow-md"
                >
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                        {course.subject}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {course.grade}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-foreground leading-snug">{course.title}</h3>
                      <p className="text-xs text-primary font-semibold mt-0.5">{course.titleHi}</p>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 font-medium">
                        <FileText className="h-3.5 w-3.5 text-secondary" />
                        <span>{course.chapters.length} Lessons</span>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-foreground">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/30 border-t border-border/40 flex items-center gap-2">
                    <Button
                      onClick={() => openClassroom(course)}
                      className="flex-1 rounded-2xl text-xs font-bold h-11 gap-1.5 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <PlayCircle className="h-4 w-4" /> Start Learning (Notes & Quiz)
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDownload(course.id)}
                      disabled={downloadingId === course.id}
                      className={`h-11 w-11 rounded-2xl shrink-0 ${
                        course.isDownloaded ? "text-green-600 border-green-500/40 bg-green-500/10" : ""
                      }`}
                      title={course.isDownloaded ? "Saved Offline" : "Download for Offline"}
                    >
                      {downloadingId === course.id ? (
                        <span className="text-[10px] font-bold text-primary">{downloadProgress}%</span>
                      ) : course.isDownloaded ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Download className="h-5 w-5 text-muted-foreground hover:text-primary" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FULLY WORKING VISIBLE SMART VIDEO CLASSROOM WITH RICH NOTES & 5-Q QUIZ */}
          {activeCourse && activeChapter && currentSlide && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
              <div className="bg-card text-card-foreground border border-border rounded-3xl max-w-4xl w-full max-h-[94vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
                
                {/* Classroom Header */}
                <div className="p-4 sm:p-5 border-b border-border flex items-start justify-between gap-4 sticky top-0 bg-card/95 backdrop-blur z-20">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {activeCourse.grade}
                      </span>
                      <span className="text-xs text-muted-foreground">{activeCourse.language}</span>
                      <span className="text-xs font-bold text-green-600 flex items-center gap-1.5 ml-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-ping"></span> Live Classroom Active
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">{activeCourse.title}</h3>
                    <p className="text-xs text-primary font-semibold">{activeChapter.title}</p>
                  </div>

                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") window.speechSynthesis.cancel();
                      setIsSpeakingNarration(false);
                      setActiveCourse(null);
                    }}
                    className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                    title="Close Classroom"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-4 sm:p-5 space-y-5 flex-1">
                  {/* Classroom Navigation Tabs */}
                  <div className="flex items-center justify-between border-b border-border pb-3 text-xs font-bold gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setClassroomTab("video")}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                          classroomTab === "video" ? "bg-primary text-primary-foreground shadow-sm font-bold" : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <PlayCircle className="h-4 w-4" /> Smart Lecture Player
                      </button>
                      <button
                        onClick={() => setClassroomTab("notes")}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                          classroomTab === "notes" ? "bg-primary text-primary-foreground shadow-sm font-bold" : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <FileText className="h-4 w-4" /> Revision Notes ({activeChapter.detailedNotes.length} Sections)
                      </button>
                      <button
                        onClick={() => setClassroomTab("quiz")}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                          classroomTab === "quiz" ? "bg-primary text-primary-foreground shadow-sm font-bold" : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <Award className="h-4 w-4" /> Practice Quiz ({activeChapter.quiz.length} Qs)
                      </button>
                    </div>

                    <span className="text-xs text-muted-foreground font-semibold bg-muted px-2.5 py-1 rounded-lg hidden sm:inline-block">
                      Chapter {activeChapterIndex + 1} of {activeCourse.chapters.length}
                    </span>
                  </div>

                  {/* TAB 1: SMART VIDEO PLAYER */}
                  {classroomTab === "video" && (
                    <div className="space-y-4">
                      <div className="relative aspect-video rounded-3xl bg-neutral-950 overflow-hidden flex flex-col justify-between text-white shadow-2xl border border-neutral-800">
                        {/* Top Overlay */}
                        <div className="w-full flex items-center justify-between text-xs p-3 sm:p-4 bg-gradient-to-b from-black/85 to-transparent z-10">
                          <div className="flex items-center gap-2">
                            <span className="bg-red-600 px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] tracking-wider flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span> Scene {activeSlideIndex + 1}
                            </span>
                            <span className="text-neutral-200 font-bold text-xs truncate max-w-[200px] sm:max-w-none">
                              {currentSlide.titleHi}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur">
                            <div className="flex items-end gap-0.5 h-3.5">
                              <span className={`w-1 bg-green-400 rounded-full transition-all ${isPlaying || isSpeakingNarration ? "h-3.5 animate-bounce" : "h-1"}`} />
                              <span className={`w-1 bg-green-400 rounded-full transition-all ${isPlaying || isSpeakingNarration ? "h-2 animate-bounce [animation-delay:0.15s]" : "h-1.5"}`} />
                              <span className={`w-1 bg-green-400 rounded-full transition-all ${isPlaying || isSpeakingNarration ? "h-3 animate-bounce [animation-delay:0.3s]" : "h-1"}`} />
                            </div>
                            <span className="text-[10px] font-bold text-green-400">
                              {isAudioMuted ? "Muted" : isSpeakingNarration ? "Speaking..." : "Audio Active"}
                            </span>
                          </div>
                        </div>

                        {/* Visual SVG Slide */}
                        <div className="relative flex-1 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
                          <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-br from-emerald-950/30 via-neutral-900 to-black rounded-2xl border border-emerald-500/20 p-3">
                            {/* SVG for reflection */}
                            {currentSlide.visualType === "reflection-ray" && (
                              <svg className="w-full h-44" viewBox="0 0 360 160">
                                <line x1="20" y1="120" x2="340" y2="120" stroke="#38bdf8" strokeWidth="4" />
                                {Array.from({ length: 16 }).map((_, i) => (
                                  <line key={i} x1={30 + i * 20} y1="120" x2={20 + i * 20} y2="135" stroke="#64748b" strokeWidth="2" />
                                ))}
                                <text x="30" y="148" fill="#94a3b8" fontSize="9">समतल दर्पण (Plane Mirror)</text>
                                <line x1="180" y1="20" x2="180" y2="120" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
                                <text x="185" y="30" fill="#c084fc" fontSize="9" fontWeight="bold">Normal (अभिलंब)</text>
                                <line x1="60" y1="30" x2="180" y2="120" stroke="#ef4444" strokeWidth="3.5" />
                                <circle cx="120" cy="75" r="4" fill="#f87171" className="animate-ping" />
                                <text x="40" y="25" fill="#f87171" fontSize="10" fontWeight="bold">आपतित किरण (∠i = 40°)</text>
                                <line x1="180" y1="120" x2="300" y2="30" stroke="#22c55e" strokeWidth="3.5" />
                                <circle cx="240" cy="75" r="4" fill="#4ade80" className="animate-ping" />
                                <text x="240" y="25" fill="#4ade80" fontSize="10" fontWeight="bold">परावर्तित किरण (∠r = 40°)</text>
                                <rect x="110" y="85" width="140" height="24" rx="6" fill="rgba(0,0,0,0.75)" stroke="#22c55e" strokeWidth="1" />
                                <text x="125" y="101" fill="#4ade80" fontSize="11" fontWeight="bold">नियम: ∠i = ∠r = 40°</text>
                              </svg>
                            )}
                            {currentSlide.visualType !== "reflection-ray" && (
                              <div className="text-center space-y-2 p-3 bg-black/60 rounded-xl border border-primary/30 max-w-md">
                                <p className="text-xs font-bold text-amber-400">{currentSlide.titleHi}</p>
                                <p className="text-sm font-semibold text-white">{currentSlide.captionHi}</p>
                              </div>
                            )}

                            <div className="mt-2 w-full max-w-xl bg-black/85 px-4 py-2 rounded-xl border border-white/10 text-center text-xs text-amber-300 font-medium">
                              👨‍🏫 <strong>शिक्षक वाणी (Subtitle):</strong> {currentSlide.captionHi}
                            </div>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="w-full space-y-2 bg-gradient-to-t from-black/95 via-black/85 to-transparent p-4 z-10">
                          <div onClick={handleSeek} className="w-full bg-neutral-700 h-2 rounded-full overflow-hidden cursor-pointer hover:h-2.5 transition-all relative">
                            <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${(currentTimeSec / activeChapter.durationSeconds) * 100}%` }} />
                          </div>
                          <div className="flex flex-wrap items-center justify-between text-xs text-neutral-300 pt-1 gap-2">
                            <div className="flex items-center gap-3">
                              <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all flex items-center justify-center">
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                              </button>
                              <span className="font-mono text-[11px] text-white">
                                {formatTime(currentTimeSec)} / {formatTime(activeChapter.durationSeconds)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={toggleTeacherSpeech} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${isSpeakingNarration ? "bg-amber-500 text-black animate-pulse" : "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"}`}>
                                {isSpeakingNarration ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                                <span>{isSpeakingNarration ? "Stop Voice" : "🔊 Listen Teacher Voice (Audio)"}</span>
                              </button>
                              <button onClick={() => setIsAudioMuted(!isAudioMuted)} className="p-1 text-neutral-400 hover:text-white">
                                {isAudioMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-green-400" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Scene Thumbnails */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between text-xs font-bold text-foreground">
                          <span className="flex items-center gap-1.5">
                            <ImageIcon className="h-4 w-4 text-primary" /> Chapter Image Scenes ({activeChapter.slides.length} Scenes)
                          </span>
                          <span className="text-[11px] text-muted-foreground">Click scene to jump</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {activeChapter.slides.map((slide, idx) => (
                            <button
                              key={slide.id}
                              onClick={() => jumpToSlide(slide)}
                              className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                                activeSlideIndex === idx ? "bg-primary/10 border-primary shadow-sm ring-2 ring-primary/30" : "bg-card border-border hover:bg-muted/40"
                              }`}
                            >
                              <div>
                                <span className="text-[10px] font-bold text-primary px-1.5 py-0.2 rounded bg-primary/10">Scene {idx + 1}</span>
                                <p className="text-xs font-bold text-foreground line-clamp-1 mt-1">{slide.titleHi}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: DETAILED IN-DEPTH REVISION NOTES */}
                  {classroomTab === "notes" && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      {/* Top Action Bar */}
                      <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                            <BookmarkCheck className="h-4 w-4 text-primary" /> Comprehensive NCERT & Board Study Notes
                          </h4>
                          <p className="text-xs text-muted-foreground">{activeChapter.title} • {activeCourse.grade}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => alert("✅ Formatted PDF revision notes saved to local storage for offline printing!")}
                          className="rounded-xl text-xs gap-1.5 h-9 bg-primary text-primary-foreground font-semibold shadow-sm"
                        >
                          <Printer className="h-3.5 w-3.5" /> Print / Save Full PDF Notes
                        </Button>
                      </div>

                      {/* Note Sections */}
                      <div className="space-y-4">
                        {activeChapter.detailedNotes.map((section, idx) => (
                          <div key={idx} className="glass-card rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
                            <button
                              onClick={() => setExpandedNotes((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                              className="w-full p-4 text-left font-bold text-xs sm:text-sm text-foreground flex items-center justify-between bg-muted/30 hover:bg-muted/60 transition-colors"
                            >
                              <span>{section.title}</span>
                              {expandedNotes[idx] ? <ChevronUp className="h-4 w-4 text-primary" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                            </button>

                            {expandedNotes[idx] && (
                              <div className="p-4 space-y-3 text-xs leading-relaxed border-t border-border/50">
                                <ul className="space-y-2">
                                  {section.content.map((bullet, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-2.5 text-foreground">
                                      <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>

                                {/* Formula Callout Box if exists */}
                                {section.formula && (
                                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/30 flex items-center gap-3">
                                    <Calculator className="h-5 w-5 text-primary shrink-0" />
                                    <div>
                                      <span className="text-[10px] font-bold text-primary uppercase">मुख्य सूत्र (Key Formula):</span>
                                      <p className="text-sm font-extrabold text-foreground font-mono">{section.formula}</p>
                                    </div>
                                  </div>
                                )}

                                {/* Solved Numerical Example Box if exists */}
                                {section.example && (
                                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                                    <span className="text-[11px] font-bold text-amber-700 uppercase flex items-center gap-1">
                                      <Sparkles className="h-3.5 w-3.5" /> हल किया गया संख्यात्मक प्रश्न (Solved Problem):
                                    </span>
                                    <p className="font-semibold text-foreground">{section.example.problem}</p>
                                    <div className="p-3 rounded-lg bg-card border border-border/60 font-mono text-[11px] whitespace-pre-line text-foreground/90">
                                      {section.example.solution}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: FULL 5-QUESTION CHAPTER PRACTICE QUIZ */}
                  {classroomTab === "quiz" && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      {/* Quiz Banner Header */}
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-background to-secondary/10 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                            <Trophy className="h-4 w-4 text-amber-500" /> Chapter Assessment Test
                          </div>
                          <h4 className="text-sm font-bold text-foreground">{activeChapter.title}</h4>
                          <p className="text-xs text-muted-foreground">{activeChapter.quiz.length} Multiple Choice Questions • Instant Certificate & Explanations</p>
                        </div>

                        {quizSubmitted && (
                          <div className="text-left sm:text-right bg-card px-4 py-2 rounded-xl border border-border shadow-xs">
                            <span className="text-[10px] text-muted-foreground font-semibold">Your Score:</span>
                            <p className="text-lg font-black text-primary">
                              {scoreResult.score} / {scoreResult.total} ({scoreResult.pct}%)
                            </p>
                          </div>
                        )}
                      </div>

                      {/* 5 Questions */}
                      <div className="space-y-4">
                        {activeChapter.quiz.map((q, qIdx) => {
                          const userAns = userQuizAnswers[qIdx];
                          const isCorrect = userAns === q.correct;
                          const hasAnswered = userAns !== undefined;

                          return (
                            <div key={qIdx} className="glass-card p-5 rounded-2xl border border-border bg-card space-y-3.5 shadow-xs">
                              <div className="flex items-start justify-between gap-3">
                                <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-start gap-2">
                                  <span className="h-5 w-5 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                    {qIdx + 1}
                                  </span>
                                  <span>{q.question}</span>
                                </h4>

                                {quizSubmitted && (
                                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                    isCorrect ? "bg-green-500/20 text-green-700" : "bg-red-500/20 text-red-700"
                                  }`}>
                                    {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                                  </span>
                                )}
                              </div>

                              {/* 4 Options Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {q.options.map((opt, optIdx) => {
                                  const isSelected = userAns === optIdx;
                                  const isCorrectOpt = optIdx === q.correct;

                                  return (
                                    <button
                                      key={opt}
                                      onClick={() => {
                                        if (!quizSubmitted) {
                                          setUserQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
                                        }
                                      }}
                                      className={`p-3 rounded-xl text-xs text-left font-medium transition-all flex items-center justify-between ${
                                        quizSubmitted && isCorrectOpt
                                          ? "bg-green-500/20 border-2 border-green-500 text-green-800 font-bold"
                                          : quizSubmitted && isSelected && !isCorrectOpt
                                          ? "bg-red-500/20 border-2 border-red-500 text-red-800 font-bold"
                                          : isSelected
                                          ? "bg-primary text-primary-foreground font-bold shadow-sm"
                                          : "bg-muted/40 hover:bg-muted border border-border text-foreground"
                                      }`}
                                    >
                                      <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                                      {quizSubmitted && isCorrectOpt && <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Explanation Callout */}
                              {quizSubmitted && (
                                <div className="p-3 rounded-xl bg-muted/60 border border-border text-[11px] text-muted-foreground">
                                  💡 <strong>विस्तृत व्याख्या:</strong> {q.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Quiz Submit Button & Results Summary Card */}
                      {!quizSubmitted ? (
                        <Button
                          onClick={() => setQuizSubmitted(true)}
                          disabled={Object.keys(userQuizAnswers).length === 0}
                          className="w-full rounded-2xl h-12 bg-primary text-primary-foreground font-bold text-sm shadow-md gap-2"
                        >
                          <Trophy className="h-4 w-4" /> Submit Chapter Quiz ({Object.keys(userQuizAnswers).length}/{activeChapter.quiz.length} Answered)
                        </Button>
                      ) : (
                        <div className="p-6 rounded-3xl bg-green-500/10 border-2 border-green-500/30 text-center space-y-4">
                          <Trophy className="h-12 w-12 text-amber-500 mx-auto animate-bounce" />
                          <div>
                            <h4 className="text-lg font-bold text-green-800">
                              {scoreResult.pct >= 80 ? "उत्कृष्ट प्रदर्शन! (Outstanding!)" : "अच्छा प्रयास! (Good Effort!)"}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              You scored <strong>{scoreResult.score} out of {scoreResult.total}</strong> ({scoreResult.pct}%). Your chapter completion certificate has been recorded.
                            </p>
                          </div>

                          <div className="flex flex-wrap justify-center gap-3 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setUserQuizAnswers({});
                                setQuizSubmitted(false);
                              }}
                              className="rounded-xl text-xs gap-1.5"
                            >
                              <RotateCcw className="h-3.5 w-3.5" /> Retake Test
                            </Button>

                            {activeChapterIndex < activeCourse.chapters.length - 1 && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setActiveChapterIndex(activeChapterIndex + 1);
                                  setClassroomTab("video");
                                  setCurrentTimeSec(10);
                                  setUserQuizAnswers({});
                                  setQuizSubmitted(false);
                                }}
                                className="rounded-xl text-xs bg-primary text-primary-foreground gap-1.5 font-bold"
                              >
                                Next Chapter →
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Chapter Selector Bar */}
                  <div className="pt-3 border-t border-border">
                    <h5 className="text-xs font-bold text-foreground mb-2">Jump to Chapter:</h5>
                    <div className="flex flex-wrap gap-2">
                      {activeCourse.chapters.map((ch, idx) => (
                        <button
                          key={ch.id}
                          onClick={() => {
                            if (typeof window !== "undefined") window.speechSynthesis.cancel();
                            setIsSpeakingNarration(false);
                            setActiveChapterIndex(idx);
                            setCurrentTimeSec(10);
                            setIsPlaying(true);
                            setUserQuizAnswers({});
                            setQuizSubmitted(false);
                          }}
                          className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                            activeChapterIndex === idx
                              ? "bg-primary text-primary-foreground font-bold shadow-sm"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Chapter {idx + 1}: {ch.title.split(" ")[1] || ch.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
