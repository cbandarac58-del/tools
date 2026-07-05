
document.addEventListener('DOMContentLoaded', () => {
  const emailPurpose = document.getElementById('emailPurpose');
  const emailTone = document.getElementById('emailTone');
  const recipientName = document.getElementById('recipientName');
  const senderName = document.getElementById('senderName');
  const keyPoints = document.getElementById('keyPoints');
  const generateEmailBtn = document.getElementById('generateEmailBtn');
  const outputSubject = document.getElementById('outputSubject');
  const outputBody = document.getElementById('outputBody');
  const copySubjectBtn = document.getElementById('copySubjectBtn');
  const copyBodyBtn = document.getElementById('copyBodyBtn');

  SmartToolzAI.addRecentTool('AI Email Generator', 'ai-email-generator.html', '📧');
  document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Email Generator');

  const templates = {
    business: {
      formal: {
        subject: 'Business Proposal / Collaboration Inquiry - [SenderName]',
        body: 'Dear [RecipientName],\n\nI hope this email finds you well.\n\nMy name is [SenderName], and I am writing to propose a business collaboration. [KeyPoints]\n\nI believe that a partnership between our organizations could yield significant mutual benefit. I would welcome the opportunity to discuss this further at your convenience.\n\nThank you for your time and consideration.\n\nSincerely,\n[SenderName]'
      },
      professional: {
        subject: 'Inquiry: Collaboration Opportunity with [SenderName]',
        body: 'Hello [RecipientName],\n\nI am reaching out to discuss a potential partnership opportunity. [KeyPoints]\n\nOur organization has been following your progress, and we believe there is a strong alignment in our goals. Let me know if you have 10 minutes next week for a brief call.\n\nBest regards,\n[SenderName]'
      },
      friendly: {
        subject: 'Quick question about collaborating! 😊',
        body: 'Hi [RecipientName],\n\nHope you are having a great week!\n\nI am [SenderName], and I wanted to reach out to see if you would be open to working together. [KeyPoints]\n\nLet me know if you would be open to a casual chat sometime soon!\n\nCheers,\n[SenderName]'
      }
    },
    followup: {
      formal: {
        subject: 'Following Up: [SenderName]',
        body: 'Dear [RecipientName],\n\nI am writing to follow up on our previous correspondence. [KeyPoints]\n\nI would appreciate any updates you might have regarding this matter.\n\nSincerely,\n[SenderName]'
      },
      professional: {
        subject: 'Follow-up regarding our discussion',
        body: 'Hi [RecipientName],\n\nI hope you are doing well. I wanted to follow up on our recent conversation about: [KeyPoints].\n\nLooking forward to hearing from you.\n\nBest regards,\n[SenderName]'
      },
      friendly: {
        subject: 'Just checking in! 👋',
        body: 'Hi [RecipientName],\n\nHope you are doing well! Just wanted to drop a quick line to follow up on [KeyPoints].\n\nNo rush, just checking in when you have a moment!\n\nThanks,\n[SenderName]'
      }
    },
    job: {
      formal: {
        subject: 'Application for Position - [SenderName]',
        body: 'Dear Hiring Manager,\n\nI am writing to express my interest in the open position at your esteemed company. [KeyPoints]\n\nI have attached my credentials and believe my skills align well with your requirements.\n\nSincerely,\n[SenderName]'
      },
      professional: {
        subject: 'Job Application: [SenderName]',
        body: 'Hello [RecipientName],\n\nI am interested in applying for the open role. [KeyPoints]\n\nI would love the opportunity to share how my experience fits your team.\n\nBest regards,\n\n[SenderName]'
      },
      friendly: {
        subject: 'Excited about the job opening! 🚀',
        body: 'Hi [RecipientName],\n\nHope you are doing awesome! I saw the job opening and wanted to throw my hat in the ring. [KeyPoints]\n\nI think I would be a great fit for the team. Looking forward to talking!\n\nCheers,\n[SenderName]'
      }
    },
    thanks: {
      formal: {
        subject: 'Expression of Gratitude - [SenderName]',
        body: 'Dear [RecipientName],\n\nI wish to express my sincere appreciation for your support. [KeyPoints]\n\nSincerely,\n[SenderName]'
      },
      professional: {
        subject: 'Thank you for your assistance',
        body: 'Hello [RecipientName],\n\nThank you so much for your help with: [KeyPoints].\n\nI truly appreciate your time.\n\nBest regards,\n[SenderName]'
      },
      friendly: {
        subject: 'Thanks a million! 🎉',
        body: 'Hi [RecipientName],\n\nJust wanted to say a huge thank you for [KeyPoints].\n\nYou are the best!\n\nCheers,\n[SenderName]'
      }
    },
    meeting: {
      formal: {
        subject: 'Request for Meeting - [SenderName]',
        body: 'Dear [RecipientName],\n\nI am writing to request a formal meeting to discuss our ongoing matters. [KeyPoints]\n\nSincerely,\n[SenderName]'
      },
      professional: {
        subject: 'Meeting Request: Discussing next steps',
        body: 'Hi [RecipientName],\n\nI would like to schedule a brief meeting to discuss [KeyPoints]. Please let me know your availability.\n\nBest regards,\n[SenderName]'
      },
      friendly: {
        subject: "Let's catch up! ☕",
        body: 'Hi [RecipientName],\n\nHope things are good! I wanted to see if we could sync up soon to chat about [KeyPoints].\n\nLet me know what day works best for you!\n\nCheers,\n[SenderName]'
      }
    }
  };

  function generateEmail() {
    const purpose = emailPurpose.value;
    const tone = emailTone.value;
    const recName = recipientName.value || 'Valued Recipient';
    const sendName = senderName.value || 'Valued Sender';
    const points = keyPoints.value || 'various discussion points';

    const selectedTemplate = templates[purpose][tone];
    
    let subject = selectedTemplate.subject
      .replace(/\[RecipientName\]/g, recName)
      .replace(/\[SenderName\]/g, sendName)
      .replace(/\[KeyPoints\]/g, points);

    let body = selectedTemplate.body
      .replace(/\[RecipientName\]/g, recName)
      .replace(/\[SenderName\]/g, sendName)
      .replace(/\[KeyPoints\]/g, points);

    outputSubject.textContent = `Subject: ${subject}`;
    outputBody.innerHTML = body.replace(/\n/g, '<br>');
  }

  generateEmailBtn.addEventListener('click', generateEmail);

  copySubjectBtn.addEventListener('click', () => {
    const text = outputSubject.textContent.replace('Subject: ', '');
    SmartToolzAI.copyToClipboard(text);
  });

  copyBodyBtn.addEventListener('click', () => {
    const text = outputBody.textContent;
    SmartToolzAI.copyToClipboard(text);
  });
});
