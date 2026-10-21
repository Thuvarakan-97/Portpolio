"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "de";

const germanTranslations: Record<string, string> = {
  About: "Über mich",
  Projects: "Projekte",
  Experience: "Berufserfahrung",
  Education: "Ausbildung",
  Testimonials: "Referenzen",
  Blog: "Blog",
  Contact: "Kontakt",
  "Start Project": "Projekt starten",
  "Get in Touch": "Kontakt aufnehmen",
  Navigation: "Navigation",
  Language: "Sprache",
  "Select language": "Sprache auswählen",
  "Explore my portfolio sections": "Entdecken Sie die Bereiche meines Portfolios",
  "Start a Project": "Projekt starten",
  "Ponraj Thuvarakan": "Ponraj Thuvarakan",
  "Full Stack Developer specializing in modern web technologies":
    "Full-Stack-Entwickler mit Schwerpunkt auf modernen Webtechnologien",
  "Contact Me": "Kontaktieren Sie mich",
  "Download CV": "Lebenslauf herunterladen",
  "Scroll to explore": "Scrollen Sie zum Entdecken",
  "Toggle menu": "Menü umschalten",
  "Toggle theme": "Darstellung umschalten",
  "About Me": "Über mich",
  "Passionate about creating exceptional digital experiences":
    "Leidenschaftlich daran interessiert, außergewöhnliche digitale Erlebnisse zu schaffen",
  "Professional Summary": "Berufliches Profil",
  "I am a skilled Full Stack Developer with extensive experience in designing and deploying scalable web applications using advanced technologies such as Next.js, React, Laravel, and Node.js. My proficiency in both front-end and back-end development allows me to deliver seamless user experiences and efficient server-side solutions. With a Bachelor's degree in Information Technology and a strong commitment to excellence, I consistently address complex technical challenges while prioritizing performance and user satisfaction. I also contribute to the tech community by sharing expertise through my Medium blog, covering topics like Next.js 15 integration with Laravel 12, React vs. Next.js comparisons, and mobile development workflows with Expo CLI and React Native CLI. I am dedicated to driving innovation and delivering impactful solutions in software development.":
    "Ich bin ein erfahrener Full-Stack-Entwickler mit umfassender Erfahrung in der Entwicklung und Bereitstellung skalierbarer Webanwendungen mit modernen Technologien wie Next.js, React, Laravel und Node.js. Meine Kenntnisse in der Frontend- und Backend-Entwicklung ermöglichen nahtlose Benutzererlebnisse und effiziente serverseitige Lösungen. Mit einem Bachelorabschluss in Informationstechnologie und einem hohen Qualitätsanspruch löse ich komplexe technische Herausforderungen und stelle Leistung und Nutzerzufriedenheit in den Mittelpunkt. Außerdem teile ich mein Wissen in meinem Medium-Blog, unter anderem zu Next.js 15 und Laravel 12, React im Vergleich zu Next.js sowie mobiler Entwicklung mit Expo CLI und React Native CLI. Ich setze mich dafür ein, Innovation voranzutreiben und wirkungsvolle Softwarelösungen zu entwickeln.",
  "I am a Full Stack Developer and M.Sc. Digital Health student at Deggendorf Institute of Technology, focused on medical informatics and the development of digital healthcare solutions. My experience building scalable web applications with Next.js, React, Laravel, and Node.js gives me a strong foundation for healthcare software, health information systems, and data-driven tools. I am particularly interested in connecting technology, clinical workflows, and healthcare data to improve efficiency, accessibility, and patient-centered care. I bring a background in Information Technology, practical software engineering experience, and a commitment to secure, usable, and impactful digital health innovation.":
    "Ich bin Full-Stack-Entwickler und studiere M.Sc. Digital Health an der Technischen Hochschule Deggendorf mit Schwerpunkt Medizinische Informatik und der Entwicklung digitaler Gesundheitslösungen. Meine Erfahrung mit skalierbaren Webanwendungen auf Basis von Next.js, React, Laravel und Node.js bildet eine solide Grundlage für Gesundheitssoftware, Gesundheitsinformationssysteme und datengestützte Anwendungen. Besonders interessiert mich, Technologie, klinische Arbeitsabläufe und Gesundheitsdaten zu verbinden, um Effizienz, Zugänglichkeit und eine patientenzentrierte Versorgung zu verbessern. Ich verbinde meinen Hintergrund in der Informationstechnologie mit praktischer Erfahrung in der Softwareentwicklung und dem Anspruch, sichere, benutzerfreundliche und wirkungsvolle digitale Gesundheitslösungen voranzubringen.",
  "Skills & Technologies": "Fähigkeiten und Technologien",
  Languages: "Programmiersprachen",
  Frontend: "Frontend",
  Backend: "Backend",
  Tools: "Werkzeuge",
  "My Projects": "Meine Projekte",
  "A showcase of my recent work and creative endeavors":
    "Ein Einblick in meine jüngsten Arbeiten und kreativen Projekte",
  "All Projects": "Alle Projekte",
  "View Project": "Projekt ansehen",
  "No projects found with this filter.": "Keine Projekte für diesen Filter gefunden.",
  "Work Experience": "Berufserfahrung",
  "My professional journey and career milestones":
    "Mein beruflicher Werdegang und wichtige Karriereschritte",
  "Tech Stack": "Technologien",
  "Key Achievements": "Wichtige Erfolge",
  "Bachelor of Industrial Information Technology (Hons)":
    "Bachelor in Industrieller Informationstechnologie (mit Auszeichnung)",
  "M.Sc. Digital Health": "M.Sc. Digital Health",
  "Deggendorf Institute of Technology": "Technische Hochschule Deggendorf",
  "Deggendorf, Germany": "Deggendorf, Deutschland",
  "Focus: Medical Informatics": "Schwerpunkt: Medizinische Informatik",
  "Medical informatics": "Medizinische Informatik",
  "Digital Health": "Digitale Gesundheit",
  "Medical Informatics": "Medizinische Informatik",
  "Health Information Systems": "Gesundheitsinformationssysteme",
  "Healthcare Data Management": "Verwaltung von Gesundheitsdaten",
  "Health Data Interoperability": "Interoperabilität von Gesundheitsdaten",
  "Clinical Informatics": "Klinische Informatik",
  "Uva Wellassa University of Sri Lanka": "Uva-Wellassa-Universität Sri Lanka",
  "Badulla": "Badulla",
  "Specialized in Information Technology": "Schwerpunkt Informationstechnologie",
  "Blogs & Publications": "Blogs und Veröffentlichungen",
  Publications: "Veröffentlichungen",
  "Read More →": "Mehr lesen →",
  Featured: "Empfohlen",
  Publisher: "Herausgeber",
  Location: "Ort",
  "University of Moratuwa, Colombo, Sri Lanka": "Universität Moratuwa, Colombo, Sri Lanka",
  avatar: "Profilbild",
  "07-08 December 2023": "07.–08. Dezember 2023",
  Conference: "Konferenz",
  "View Publication →": "Veröffentlichung ansehen →",
  "Have a project in mind? Let's work together to bring your ideas to life":
    "Haben Sie ein Projekt im Sinn? Lassen Sie uns Ihre Ideen gemeinsam verwirklichen.",
  Name: "Name",
  "Your Name": "Ihr Name",
  Email: "E-Mail",
  "Phone Number": "Telefonnummer",
  Optional: "Optional",
  Message: "Nachricht",
  "Tell me about your project...": "Erzählen Sie mir von Ihrem Projekt ...",
  "Sending...": "Wird gesendet ...",
  "Send Message": "Nachricht senden",
  "Name is required": "Bitte geben Sie Ihren Namen ein.",
  "Name must be at least 2 characters": "Der Name muss mindestens 2 Zeichen lang sein.",
  "Email is required": "Bitte geben Sie Ihre E-Mail-Adresse ein.",
  "Please enter a valid email": "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  "Message is required": "Bitte geben Sie eine Nachricht ein.",
  "Message must be at least 10 characters": "Die Nachricht muss mindestens 10 Zeichen lang sein.",
  "Message sent successfully! I'll get back to you soon.":
    "Nachricht erfolgreich gesendet! Ich melde mich bald bei Ihnen.",
  "Failed to send message.": "Die Nachricht konnte nicht gesendet werden.",
  "An error occurred. Please try again later.":
    "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
  "Stay Updated!": "Bleiben Sie auf dem Laufenden!",
  "Subscribe to my newsletter for the latest updates on web development, tutorials, and tech insights.":
    "Abonnieren Sie meinen Newsletter und erhalten Sie Neuigkeiten zu Webentwicklung, Tutorials und Technologie.",
  "Subscribing...": "Anmeldung läuft ...",
  "Subscribe to Newsletter": "Newsletter abonnieren",
  "Please enter a valid email address.": "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  "🎉 Thank you for subscribing! Check your inbox for updates.":
    "🎉 Vielen Dank für Ihr Abonnement! Neuigkeiten finden Sie in Ihrem Posteingang.",
  "By subscribing, you agree to our": "Mit dem Abonnement stimmen Sie unserer",
  "Privacy Policy": "Datenschutzerklärung",
  "Unsubscribe anytime.": "Sie können sich jederzeit abmelden.",
  "Building innovative solutions with passion and creativity. Let's create something amazing together.":
    "Mit Leidenschaft und Kreativität entwickle ich innovative Lösungen. Lassen Sie uns gemeinsam etwas Großartiges schaffen.",
  "Quick Links": "Direktlinks",
  Resources: "Ressourcen",
  "Connect With Me": "Kontaktieren Sie mich",
  "All rights reserved.": "Alle Rechte vorbehalten.",
  "Back to Top": "Nach oben",
  "Scroll to top": "Zum Seitenanfang scrollen",
  "Start Your Project": "Projekt starten",
  "Let's bring your ideas to life! Fill out the form below and I'll get back to you within 12-24 hours \n              with a detailed proposal and timeline.":
    "Lassen Sie uns Ihre Ideen verwirklichen! Füllen Sie das Formular aus. Ich melde mich innerhalb von 12–24 Stunden mit einem detaillierten Angebot und Zeitplan.",
  "Let's bring your ideas to life! Fill out the form below and I'll get back to you within 12-24 hours with a detailed proposal and timeline.":
    "Lassen Sie uns Ihre Ideen verwirklichen! Füllen Sie das Formular aus. Ich melde mich innerhalb von 12–24 Stunden mit einem detaillierten Angebot und Zeitplan.",
  "Contact Information": "Kontaktinformationen",
  "Full Name *": "Vollständiger Name *",
  "Enter Your Name": "Geben Sie Ihren Namen ein",
  "Email Address *": "E-Mail-Adresse *",
  "Enter your email": "Geben Sie Ihre E-Mail-Adresse ein",
  "Enter your phone number": "Geben Sie Ihre Telefonnummer ein",
  "Enter Your Company Name": "Geben Sie den Namen Ihres Unternehmens ein",
  Website: "Website",
  "Website (Optional)": "Website (optional)",
  "Company/Organization (Optional)": "Unternehmen/Organisation (optional)",
  "Phone Number (Optional)": "Telefonnummer (optional)",
  "Full Stack Developer": "Full-Stack-Entwickler",
  "$100 - $200": "100 $ – 200 $",
  "$200 - $500": "200 $ – 500 $",
  "$500 - $1,000": "500 $ – 1.000 $",
  "$1,000 - $2,000": "1.000 $ – 2.000 $",
  "Company/Organization": "Unternehmen/Organisation",
  "Project Details": "Projektdetails",
  "Project Type *": "Projekttyp *",
  "Select type": "Typ auswählen",
  "Web Development": "Webentwicklung",
  "Mobile App": "Mobile App",
  "Full Stack Application": "Full-Stack-Anwendung",
  "E-commerce": "E-Commerce",
  "Portfolio Website": "Portfolio-Website",
  "Landing Page": "Landingpage",
  "Web Application": "Webanwendung",
  "API Integration": "API-Integration",
  "Website Maintenance": "Website-Wartung",
  Consulting: "Beratung",
  Other: "Sonstiges",
  "Budget Range *": "Budgetrahmen *",
  "Select range": "Bereich auswählen",
  "Under $100": "Unter 100 $",
  "Above $2,000": "Über 2.000 $",
  "Timeline *": "Zeitrahmen *",
  "Select timeline": "Zeitrahmen auswählen",
  "ASAP (1-2 weeks)": "So bald wie möglich (1–2 Wochen)",
  "1 Month": "1 Monat",
  "2-3 Months": "2–3 Monate",
  "3-6 Months": "3–6 Monate",
  "6+ Months": "Mehr als 6 Monate",
  Flexible: "Flexibel",
  "Project Description *": "Projektbeschreibung *",
  "Additional Information": "Zusätzliche Informationen",
  "Please describe your project in detail. Include:\n- What problem you're trying to solve\n- Key features and functionality needed\n- Target audience\n- Any specific requirements or preferences\n- Examples of similar projects you like":
    "Beschreiben Sie Ihr Projekt bitte ausführlich. Gehen Sie dabei auf Folgendes ein:\n- Welches Problem möchten Sie lösen?\n- Welche Funktionen werden benötigt?\n- Wer ist die Zielgruppe?\n- Gibt es besondere Anforderungen oder Wünsche?\n- Beispiele ähnlicher Projekte, die Ihnen gefallen",
  "Any other details you'd like to share? (e.g., brand guidelines, preferred technologies, existing systems to integrate with, etc.)":
    "Möchten Sie weitere Details mitteilen? (z. B. Markenrichtlinien, bevorzugte Technologien oder zu integrierende Systeme)",
  "Submitting Request...": "Anfrage wird gesendet ...",
  "Submit Project Request": "Projektanfrage senden",
  "Please select a project type": "Bitte wählen Sie einen Projekttyp aus.",
  "Please select a budget range": "Bitte wählen Sie einen Budgetrahmen aus.",
  "Please select a timeline": "Bitte wählen Sie einen Zeitrahmen aus.",
  "Project description is required": "Bitte beschreiben Sie Ihr Projekt.",
  "Please provide more details (at least 20 characters)":
    "Bitte geben Sie weitere Details an (mindestens 20 Zeichen).",
  "Please fix the errors above before submitting.":
    "Bitte korrigieren Sie die oben angezeigten Fehler, bevor Sie das Formular absenden.",
  "🎉 Thank you! Your project request has been submitted. I'll get back to you within 12-24 hours.":
    "🎉 Vielen Dank! Ihre Projektanfrage wurde gesendet. Ich melde mich innerhalb von 12–24 Stunden.",
  "Failed to submit request.": "Die Anfrage konnte nicht gesendet werden.",
  "Fast Response": "Schnelle Rückmeldung",
  "Tailored Solutions": "Individuelle Lösungen",
  "Quality Delivery": "Qualität und Zuverlässigkeit",
  "Last updated: March 20, 2025": "Zuletzt aktualisiert: 20. März 2025",
  "1. Introduction": "1. Einleitung",
  "2. Information We Collect": "2. Erfasste Informationen",
  "3. How We Use Your Information": "3. Verwendung Ihrer Informationen",
  "4. Third-Party Services": "4. Dienste Dritter",
  "5. Data Storage and Security": "5. Speicherung und Sicherheit der Daten",
  "6. Your Rights": "6. Ihre Rechte",
  "7. Cookies": "7. Cookies",
  "8. Changes to This Privacy Policy": "8. Änderungen dieser Datenschutzerklärung",
  "9. Contact Us": "9. Kontakt",
  "Back to Home": "Zurück zur Startseite",
  "Customer Portal Project": "Kundenportal-Projekt",
  "DIGA – Mobile Application": "DIGA – Mobile Anwendung",
  "DIGA (Digitale Gesundheitsanwendung) is a mobile application developed as a university final-year project. It provides a user-friendly mobile experience with a responsive interface and Firebase integration for backend services and data management.":
    "DIGA (Digitale Gesundheitsanwendung) ist eine mobile Anwendung, die als universitäres Abschlussprojekt entwickelt wurde. Sie bietet eine benutzerfreundliche mobile Erfahrung mit einer responsiven Oberfläche und Firebase-Integration für Backend-Dienste und Datenverwaltung.",
  "University Final-Year Project": "Universitäres Abschlussprojekt",
  "Moura E-Learning Project": "Moura-E-Learning-Projekt",
  "Bakery Management Project": "Bäckerei-Verwaltungsprojekt",
  "Developed a portal for managing customer profiles, shipments, and transactions for a shipping company, with a focus on seamless user experience and data management.":
    "Entwicklung eines Portals zur Verwaltung von Kundenprofilen, Sendungen und Transaktionen für ein Versandunternehmen mit Fokus auf eine nahtlose Benutzererfahrung und Datenverwaltung.",
  "An e-learning platform with 8 modules including admin, student, institute, guardian, sponsor, chat, and social media features, designed to facilitate online education.":
    "Eine E-Learning-Plattform mit acht Modulen für Administration, Studierende, Institute, Erziehungsberechtigte, Sponsoren, Chat und soziale Medien zur Unterstützung des Online-Lernens.",
  "A sophisticated bakery product delivery management system built as a real-time mobile application, streamlining order processing and delivery workflows.":
    "Ein modernes Lieferverwaltungssystem für eine Bäckerei als Echtzeit-App, das Bestell- und Lieferabläufe optimiert.",
  "Software Engineer": "Softwareentwickler",
  "Associate Software Engineer": "Junior-Softwareentwickler",
  "Intern Software Engineer": "Praktikant Softwareentwicklung",
  "2024 April - Present": "April 2024 – heute",
  "2023 September - 2024 April": "September 2023 – April 2024",
  "2023 March - 2023 September": "März 2023 – September 2023",
  "2022 January - 2022 June": "Januar 2022 – Juni 2022",
  "Colombo, Sri Lanka": "Colombo, Sri Lanka",
  "Jaffna, Sri Lanka": "Jaffna, Sri Lanka",
  "Batticaloa, Sri Lanka": "Batticaloa, Sri Lanka",
  "Developed a customer portal for managing customer profiles, shipments, and transactions for a shipping company. Led the development of user-friendly interfaces and handled backend integrations.":
    "Entwicklung eines Kundenportals zur Verwaltung von Profilen, Sendungen und Transaktionen für ein Versandunternehmen. Leitung der Entwicklung benutzerfreundlicher Oberflächen und Integration des Backends.",
  "Worked on the Moura E-Learning Platform, enhancing various modules such as Admin, Institute, and Sponsor modules. Implemented features and improved performance using modern technologies.":
    "Mitarbeit an der Moura-E-Learning-Plattform und Weiterentwicklung der Module für Administration, Institute und Sponsoren. Implementierung neuer Funktionen und Leistungsverbesserungen mit modernen Technologien.",
  "Contributed to the development of Moura E-Learning Platform by supporting the Admin, Institute, and Sponsor modules. Collaborated with senior engineers in developing new features and maintaining existing functionality.":
    "Mitwirkung an der Entwicklung der Moura-E-Learning-Plattform und Unterstützung der Verwaltungs-, Instituts- und Sponsorenmodule. Zusammenarbeit mit erfahrenen Entwicklern bei neuen Funktionen und der Pflege bestehender Anwendungen.",
  "Contributed to the development of a company website and management system to improve operational efficiency and user engagement. Involved in building dynamic user interfaces and backend functionality.":
    "Mitwirkung an der Entwicklung einer Unternehmenswebsite und eines Verwaltungssystems zur Verbesserung der betrieblichen Effizienz und Nutzerinteraktion. Entwicklung dynamischer Oberflächen und Backend-Funktionen.",
  "Built user-friendly interfaces with Next.js and Next UI for efficient customer management.": "Entwicklung benutzerfreundlicher Oberflächen mit Next.js und Next UI für eine effiziente Kundenverwaltung.",
  "Handled customer profiles, shipment records, and transaction management.": "Verwaltung von Kundenprofilen, Sendungsdaten und Transaktionen.",
  "Led a team in integrating backend services and implemented CI/CD for smooth deployments.": "Leitung eines Teams bei der Integration von Backend-Diensten und Einführung von CI/CD für reibungslose Bereitstellungen.",
  "Managed import/export operations (sea and air).": "Verwaltung von Import- und Exportvorgängen (See- und Luftfracht).",
  "Enhanced Admin module to provide real-time analytics.": "Erweiterung des Verwaltungsmoduls um Echtzeit-Analysen.",
  "Improved performance and optimized data flow in the Institute module.": "Verbesserung der Leistung und Optimierung des Datenflusses im Institutsmodul.",
  "Developed the Sponsor module, enabling sponsors to manage funding effectively.": "Entwicklung des Sponsorenmoduls zur effektiven Verwaltung von Fördermitteln.",
  "Assisted in building and maintaining the Admin and Institute modules.": "Unterstützung bei Entwicklung und Wartung der Verwaltungs- und Institutsmodule.",
  "Worked on implementing sponsor tracking features.": "Mitarbeit an Funktionen zur Nachverfolgung von Sponsoren.",
  "Optimized SQL queries to improve platform performance.": "Optimierung von SQL-Abfragen zur Verbesserung der Plattformleistung.",
  "Developed and maintained the company website using React.": "Entwicklung und Wartung der Unternehmenswebsite mit React.",
  "Built and optimized the management system backend with Node.js and MySQL.": "Entwicklung und Optimierung des Backends des Verwaltungssystems mit Node.js und MySQL.",
  "Enhanced user engagement through dynamic and interactive front-end design.": "Steigerung der Nutzerinteraktion durch ein dynamisches und interaktives Frontend.",
  "The next decade will see humans and AI compete over jobs, creativity, ethics, and power. The outcome hinges on balancing AI's potential to enhance society while ensuring human control and ethical use.":
    "Im nächsten Jahrzehnt konkurrieren Menschen und KI um Arbeitsplätze, Kreativität, Ethik und Einfluss. Entscheidend ist, das Potenzial der KI gesellschaftlich zu nutzen und zugleich menschliche Kontrolle und ethischen Einsatz sicherzustellen.",
  "A comprehensive guide on integrating Next.js 15 with Laravel 12, presented in a simple format for developers to follow.":
    "Eine umfassende, leicht verständliche Anleitung zur Integration von Next.js 15 und Laravel 12.",
  "An analysis of the key differences and upgrades from Next.js 14 to Next.js 15, highlighting new features and improvements.":
    "Eine Analyse der wichtigsten Unterschiede und Neuerungen von Next.js 14 zu Next.js 15.",
  "A comparison of ReactJS and NextJS, exploring their strengths, use cases, and differences for web development.":
    "Ein Vergleich von ReactJS und NextJS mit ihren Stärken, Einsatzgebieten und Unterschieden in der Webentwicklung.",
  "A breakdown of Expo CLI and React Native CLI, comparing their workflows, advantages, and limitations for mobile app development.":
    "Ein Überblick über Expo CLI und React Native CLI mit einem Vergleich ihrer Arbeitsabläufe, Vorteile und Grenzen bei der Entwicklung mobiler Apps.",
  "The Application of Convolutional Neural Network in the Context of Tamil Handwritten Character Recognition":
    "Die Anwendung faltender neuronaler Netze zur Erkennung handgeschriebener tamilischer Schriftzeichen",
  "This research explores CNNs for recognizing 247 Tamil characters and 18 North Indian characters, achieving 95% accuracy and addressing challenges such as data scarcity and writing style variations.":
    "Diese Forschung untersucht CNNs zur Erkennung von 247 tamilischen und 18 nordindischen Schriftzeichen. Sie erreicht eine Genauigkeit von 95 % und behandelt Herausforderungen wie begrenzte Daten und unterschiedliche Schreibstile.",
  "Senior Software Engineer": "Senior-Softwareentwickler",
  "IOT Developer": "IoT-Entwickler",
  "Working with Thuvarakan was a pleasure. He has a knack for solving complex problems and always approaches challenges with a positive attitude and dedication.":
    "Die Zusammenarbeit mit Thuvarakan war eine Freude. Er löst komplexe Probleme mit Geschick und begegnet Herausforderungen stets positiv und engagiert.",
  "Thuvarakan developed an efficient portal for us that improved our processes significantly. His ability to integrate various aspects of the system seamlessly was impressive.":
    "Thuvarakan entwickelte für uns ein effizientes Portal, das unsere Abläufe deutlich verbessert hat. Seine Fähigkeit, verschiedene Systembereiche nahtlos zu integrieren, war beeindruckend.",
  "Thuvarakan's work was integral to the success of our project. His attention to detail and ability to deliver high-quality solutions exceeded our expectations.":
    "Thuvarakans Arbeit war entscheidend für den Erfolg unseres Projekts. Seine Liebe zum Detail und seine hochwertigen Lösungen haben unsere Erwartungen übertroffen.",
  "Introduction": "Einleitung",
  "We may collect the following types of information:": "Wir können folgende Arten von Informationen erfassen:",
  "Welcome to Thuvarakan’s portfolio website (\"we,\" \"us,\" or \"our\"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services, including subscribing to our newsletter and interacting with our chatbot.":
    "Willkommen auf der Portfolio-Website von Thuvarakan („wir“, „uns“ oder „unser“). Wir verpflichten uns, Ihre Privatsphäre zu schützen und Ihre personenbezogenen Daten sicher und verantwortungsvoll zu behandeln. Diese Datenschutzerklärung erläutert, wie wir Ihre Daten erfassen, verwenden, offenlegen und schützen, wenn Sie unsere Website besuchen oder unsere Dienste nutzen, einschließlich des Newsletters und unseres Chatbots.",
  "By using our website, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use our website.":
    "Mit der Nutzung unserer Website stimmen Sie den Bedingungen dieser Datenschutzerklärung zu. Wenn Sie mit den hier beschriebenen Vorgehensweisen nicht einverstanden sind, nutzen Sie unsere Website bitte nicht.",
  "Personal Information:": "Personenbezogene Daten:",
  "When you sign up for our newsletter, we collect your email address. If you interact with our chatbot, we may collect your name, email address, and chat messages if you provide them. We do not collect any other personal information unless you voluntarily provide it (e.g., through a contact form, if available).":
    "Wenn Sie unseren Newsletter abonnieren, erfassen wir Ihre E-Mail-Adresse. Bei der Nutzung unseres Chatbots können wir Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachrichten erfassen, sofern Sie diese angeben. Andere personenbezogene Daten erfassen wir nur, wenn Sie sie freiwillig bereitstellen, beispielsweise über ein Kontaktformular.",
  "Non-Personal Information:": "Nicht personenbezogene Daten:",
  "We may collect non-identifiable information such as your browser type, IP address, and pages visited on our website through cookies and similar technologies. This helps us improve your experience and analyze website usage.":
    "Über Cookies und ähnliche Technologien können wir nicht personenbezogene Informationen wie Browsertyp, IP-Adresse und besuchte Seiten erfassen. Diese Daten helfen uns, die Nutzung der Website auszuwerten und Ihr Nutzungserlebnis zu verbessern.",
  "We use the information we collect for the following purposes:": "Wir verwenden die erfassten Informationen für folgende Zwecke:",
  "Newsletter Subscription:": "Newsletter-Abonnement:",
  "To send you updates, news, and promotional content via email if you subscribe to our newsletter. You can unsubscribe at any time using the link provided in each email.":
    "Wenn Sie unseren Newsletter abonnieren, senden wir Ihnen per E-Mail Neuigkeiten, Updates und Informationen. Sie können sich jederzeit über den Abmeldelink in jeder E-Mail abmelden.",
  "Chatbot Interaction:": "Chatbot-Interaktion:",
  "To provide assistance, answer questions, and guide you through our website via our chatbot. Chat messages may be stored to improve our services and respond to your inquiries.":
    "Unser Chatbot unterstützt Sie, beantwortet Fragen und hilft Ihnen bei der Nutzung unserer Website. Chatnachrichten können gespeichert werden, um unseren Service zu verbessern und auf Ihre Anfragen zu antworten.",
  "Website Improvement:": "Verbesserung der Website:",
  "To analyze how users interact with our website and improve its functionality and content.":
    "Wir analysieren, wie Besucher unsere Website nutzen, um ihre Funktionen und Inhalte zu verbessern.",
  "Security:": "Sicherheit:",
  "To protect our website from fraudulent or unauthorized access, including using reCAPTCHA to prevent spam submissions.":
    "Wir schützen unsere Website vor Betrug und unbefugtem Zugriff und verwenden unter anderem reCAPTCHA, um Spam-Eingaben zu verhindern.",
  "We use third-party services to manage our newsletter subscriptions, enhance website functionality, and provide chatbot services. These services may have access to your personal information:":
    "Wir nutzen Dienste Dritter zur Verwaltung unseres Newsletters, zur Erweiterung der Website-Funktionen und für den Chatbot. Diese Dienste können Zugriff auf Ihre personenbezogenen Daten haben:",
  "Mailchimp:": "Mailchimp:",
  "We use Mailchimp to manage our newsletter subscriptions. When you sign up for our newsletter, your email address is stored in Mailchimp’s servers. Mailchimp’s privacy policy can be found":
    "Wir verwalten unsere Newsletter-Abonnements mit Mailchimp. Wenn Sie den Newsletter abonnieren, wird Ihre E-Mail-Adresse auf den Servern von Mailchimp gespeichert. Die Datenschutzerklärung von Mailchimp finden Sie",
  "Google reCAPTCHA:": "Google reCAPTCHA:",
  "We use Google reCAPTCHA to prevent spam submissions in our newsletter signup form. This may involve collecting hardware and software information, such as IP addresses and device data. Google’s privacy policy can be found":
    "Wir verwenden Google reCAPTCHA, um Spam-Anmeldungen für den Newsletter zu verhindern. Dabei können Hardware- und Softwareinformationen wie IP-Adressen und Gerätedaten erfasst werden. Die Datenschutzerklärung von Google finden Sie",
  "Tawk.to:": "Tawk.to:",
  "We use Tawk.to to provide chatbot and live chat functionality on our website. If you interact with the chatbot, Tawk.to may collect your name, email address, and chat messages if you provide them. Tawk.to’s privacy policy can be found":
    "Wir verwenden Tawk.to für Chatbot- und Live-Chat-Funktionen. Bei der Nutzung des Chatbots kann Tawk.to Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachrichten erfassen, sofern Sie diese angeben. Die Datenschutzerklärung von Tawk.to finden Sie",
  "We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.":
    "Wir ergreifen angemessene Maßnahmen, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Verwendung oder Offenlegung zu schützen. Allerdings ist keine Übertragung über das Internet oder elektronische Speicherung zu 100 % sicher; absolute Sicherheit können wir daher nicht garantieren.",
  "Your email address is stored securely in Mailchimp’s servers, and chat data is stored in Tawk.to’s servers. We do not store this information directly on our website’s servers. We retain your information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.":
    "Ihre E-Mail-Adresse wird sicher auf den Servern von Mailchimp und Chatdaten werden auf den Servern von Tawk.to gespeichert. Wir speichern diese Informationen nicht direkt auf unseren Webservern. Wir bewahren Ihre Daten nur so lange auf, wie es für die in dieser Datenschutzerklärung genannten Zwecke oder gesetzlich erforderlich ist.",
  "You have the following rights regarding your personal information:": "Sie haben in Bezug auf Ihre personenbezogenen Daten folgende Rechte:",
  "Access and Update:": "Zugriff und Aktualisierung:",
  "You can access or update your email address by managing your subscription preferences through the link provided in our newsletter emails. For chat data, you can request access by contacting us.":
    "Sie können Ihre E-Mail-Adresse über den Link in unseren Newsletter-E-Mails einsehen oder aktualisieren. Für Chatdaten können Sie den Zugriff bei uns anfragen.",
  "Unsubscribe:": "Abmeldung:",
  "You can unsubscribe from our newsletter at any time by clicking the \"Unsubscribe\" link in any email you receive from us.":
    "Sie können sich jederzeit abmelden, indem Sie in einer unserer E-Mails auf den Link „Abmelden“ klicken.",
  "Request Deletion:": "Löschung beantragen:",
  "You can request the deletion of your personal information, including chat data, by contacting us at":
    "Sie können die Löschung Ihrer personenbezogenen Daten einschließlich Chatdaten beantragen. Kontaktieren Sie uns dazu unter",
  "We use cookies and similar technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us understand how you use our site. The chatbot may also use cookies to maintain chat sessions. You can manage your cookie preferences through your browser settings.":
    "Wir verwenden Cookies und ähnliche Technologien, um Ihr Nutzungserlebnis zu verbessern. Cookies sind kleine Datendateien auf Ihrem Gerät, mit denen wir nachvollziehen können, wie Sie unsere Website nutzen. Auch der Chatbot kann Cookies verwenden, um Chatsitzungen aufrechtzuerhalten. Sie können Cookies in den Einstellungen Ihres Browsers verwalten.",
  "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on this page with a revised \"Last updated\" date.":
    "Wir können diese Datenschutzerklärung gelegentlich an geänderte Vorgehensweisen oder gesetzliche Anforderungen anpassen. Über wesentliche Änderungen informieren wir durch eine aktualisierte Fassung auf dieser Seite mit einem neuen Datum unter „Zuletzt aktualisiert“.",
  "If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:":
    "Bei Fragen oder Anliegen zu dieser Datenschutzerklärung oder zum Umgang mit Ihren personenbezogenen Daten kontaktieren Sie uns bitte unter:",
  "Email:": "E-Mail:",
  "Or Send Quick Message": "Oder senden Sie eine kurze Nachricht",
  "Your information will be kept confidential and used solely for project communication.":
    "Ihre Angaben werden vertraulich behandelt und ausschließlich zur Kommunikation über das Projekt verwendet.",
  "I'll review your request and respond within 12-24 hours with initial feedback and next steps.":
    "Ich prüfe Ihre Anfrage und melde mich innerhalb von 12–24 Stunden mit einer ersten Einschätzung und den nächsten Schritten.",
  "Every project is unique. I'll create a custom proposal that fits your specific needs and goals.":
    "Jedes Projekt ist einzigartig. Ich erstelle ein individuelles Angebot, das zu Ihren Anforderungen und Zielen passt.",
  "Committed to delivering high-quality work on time, with regular updates throughout the process.":
    "Ich liefere hochwertige Arbeit termingerecht und halte Sie während des gesamten Prozesses regelmäßig auf dem Laufenden.",
  "here": "hier",
  "By submitting this form, you agree to our": "Mit dem Absenden dieses Formulars stimmen Sie unserer",
  "2023 8th International Conference on Information Technology Research (ICITR)":
    "8. Internationale Konferenz für Informationstechnologieforschung 2023 (ICITR)",
  "AI vs Humans: Who Will Win the Next Decade": "KI gegen Menschen: Wer gewinnt das nächste Jahrzehnt?",
  "How to Connect Next.js 15 with Laravel 12: A Deep Dive with Simple Format for Developers":
    "Next.js 15 mit Laravel 12 verbinden: Eine ausführliche und einfache Anleitung für Entwickler",
  "Difference Between Next.js 14 to Next.js 15": "Die Unterschiede zwischen Next.js 14 und Next.js 15",
  "ReactJS vs NextJS": "ReactJS im Vergleich zu NextJS",
  "Expo CLI vs React Native CLI": "Expo CLI im Vergleich zu React Native CLI",
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    if (savedLanguage === "de" || savedLanguage === "en") {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === "de" ? "Thuvarakans Portfolio" : "Thuvarakan's Portfolio";
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        language === "de"
          ? "Ein Portfolio mit Thuvarakans Projekten und Fähigkeiten."
          : "A portfolio showcasing Thuvarakan's projects and skills."
      );
    }
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: (text) => {
        if (language !== "de") return text;
        if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
          return new Intl.DateTimeFormat("de-DE").format(new Date(`${text}T00:00:00`));
        }
        const normalizedText = text.replace(/\s+/g, " ").trim();
        return germanTranslations[text] ?? germanTranslations[normalizedText] ?? text;
      },
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
