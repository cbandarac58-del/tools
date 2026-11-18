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
  if (document.getElementById('toolSidebar')) {
    document.getElementById('toolSidebar').innerHTML = SmartToolzAI.createToolSidebar('AI Email Generator');
  }

  const templates = {
    business: {
      formal: {
        subject: 'Business Proposal / Collaboration Inquiry - [SenderName]',
        body: 'Dear [RecipientName],\n\nI hope this email finds you well.\n\nMy name is [SenderName], and I am writing to propose a strategic collaboration. [KeyPoints]\n\nI believe that a partnership between our teams could yield significant mutual value. I would welcome the opportunity to discuss this further at your convenience.\n\nThank you for your time and consideration.\n\nSincerely,\n[SenderName]'
      },
      professional: {
        subject: 'Inquiry: Collaboration Opportunity with [SenderName]',
        body: 'Hello [RecipientName],\n\nI am reaching out to discuss a potential partnership opportunity. [KeyPoints]\n\nWe believe there is a strong alignment in our goals. Let me know if you have 10 minutes this week for a brief call.\n\nBest regards,\n[SenderName]'
      },
      friendly: {
        subject: 'Quick question about collaborating! 😊',
        body: 'Hi [RecipientName],\n\nHope you are having a great week!\n\nI am [SenderName], and I wanted to reach out to see if you would be open to working together. [KeyPoints]\n\nLet me know if you would be up for a quick chat soon!\n\nCheers,\n[SenderName]'
      }
    },
    followup: {
      formal: {
        subject: 'Following Up: [SenderName]',
        body: 'Dear [RecipientName],\n\nI am writing to follow up on our previous correspondence regarding: [KeyPoints].\n\nI would appreciate any updates you might have on this matter.\n\nSincerely,\n[SenderName]'
      },
      professional: {
        subject: 'Quick follow-up regarding our discussion',
        body: 'Hi [RecipientName],\n\nI hope you are doing well. I wanted to follow up on our recent conversation about [KeyPoints].\n\nLooking forward to hearing your thoughts.\n\nBest regards,\n[SenderName]'
      },
      friendly: {
        subject: 'Just checking in! 👋',
        body: 'Hi [RecipientName],\n\nHope your week is going well! Just wanted to drop a quick note to follow up on [KeyPoints].\n\nNo rush—just let me know whenever you have a moment!\n\nThanks,\n[SenderName]'
      }
    },
    job: {
      formal: {
        subject: 'Application for Position - [SenderName]',
        body: 'Dear [RecipientName],\n\nI am writing to express my strong interest in the open position at your organization. [KeyPoints]\n\nI have attached my resume and believe my background aligns closely with your requirements.\n\nSincerely,\n[SenderName]'
      },
      professional: {
        subject: 'Job Application: [SenderName]',
        body: 'Hello [RecipientName],\n\nI am excited to apply for the open role. [KeyPoints]\n\nI would welcome the opportunity to discuss how my experience can contribute to your team.\n\nBest regards,\n[SenderName]'
      },
      friendly: {
        subject: 'Excited about the role! 🚀',
        body: 'Hi [RecipientName],\n\nHope you are doing well! I saw the opening and wanted to apply right away. [KeyPoints]\n\nI would love to chat about how I can help the team!\n\nCheers,\n[SenderName]'
      }
    },
    thanks: {
      formal: {
        subject: 'Expression of Gratitude - [SenderName]',
        body: 'Dear [RecipientName],\n\nI wish to express my sincere appreciation for your support regarding [KeyPoints].\n\nSincerely,\n[SenderName]'
      },
      professional: {
        subject: 'Thank you for your assistance',
        body: 'Hello [RecipientName],\n\nThank you very much for your help with [KeyPoints]. I truly appreciate your time and insights.\n\nBest regards,\n[SenderName]'
      },
      friendly: {
        subject: 'Thanks a million! 🎉',
        body: 'Hi [RecipientName],\n\nJust wanted to say a huge thank you for [KeyPoints]. Really appreciate your help!\n\nCheers,\n[SenderName]'
      }
    },
    meeting: {
      formal: {
        subject: 'Request for Meeting - [SenderName]',
        body: 'Dear [RecipientName],\n\nI am writing to request a brief meeting to discuss [KeyPoints]. Please let me know a time that suits your schedule.\n\nSincerely,\n[SenderName]'
      },
      professional: {
        subject: 'Meeting Request: Discussing next steps',
        body: 'Hi [RecipientName],\n\nI would like to schedule a short meeting to discuss [KeyPoints]. Please let me know your availability this week.\n\nBest regards,\n[SenderName]'
      },
      friendly: {
        subject: "Let's catch up! ☕",
        body: 'Hi [RecipientName],\n\nHope things are going great! Could we hop on a quick call soon to chat about [KeyPoints]?\n\nLet me know what day works best for you!\n\nCheers,\n[SenderName]'
      }
    }
  };

  async function generateEmail() {
    const purpose = emailPurpose.value;
    const tone = emailTone.value;
    const recName = recipientName.value.trim() || 'Hiring Manager / Team';
    const sendName = senderName.value.trim() || 'Alex Morgan';
    const points = keyPoints.value.trim() || 'exploring a potential collaboration and scheduling a quick call';

    const origBtnText = generateEmailBtn.innerHTML;
    generateEmailBtn.disabled = true;
    generateEmailBtn.innerHTML = '⏳ Generating with AI...';

    try {
      const prompt = `Write a ${tone} email for purpose "${purpose}".
Recipient Name: ${recName}
Sender Name: ${sendName}
Key Points to include: ${points}

Format the response strictly as:
SUBJECT: <subject line here>
BODY:
<email body here>`;

      const aiRes = await SmartToolzAI.generateWithAI(prompt);
      const subjMatch = aiRes.match(/SUBJECT:\s*(.+)/i);
      const bodyMatch = aiRes.split(/BODY:\s*/i);

      if (subjMatch && bodyMatch.length > 1) {
        outputSubject.textContent = `Subject: ${subjMatch[1].trim()}`;
        outputBody.innerHTML = bodyMatch[1].trim().replace(/\n/g, '<br>');
      } else {
        const lines = aiRes.split('\n').filter(Boolean);
        const firstLine = lines[0].replace(/^Subject:\s*/i, '').trim();
        outputSubject.textContent = `Subject: ${firstLine}`;
        outputBody.innerHTML = lines.slice(1).join('\n').trim().replace(/\n/g, '<br>');
      }
      SmartToolzAI.showToast('AI Email generated!');
    } catch {
      const selectedTemplate = (templates[purpose] && templates[purpose][tone]) || templates.business.professional;
      const subject = selectedTemplate.subject
        .replace(/\[RecipientName\]/g, recName)
        .replace(/\[SenderName\]/g, sendName)
        .replace(/\[KeyPoints\]/g, points);
      const body = selectedTemplate.body
        .replace(/\[RecipientName\]/g, recName)
        .replace(/\[SenderName\]/g, sendName)
        .replace(/\[KeyPoints\]/g, points);

      outputSubject.textContent = `Subject: ${subject}`;
      outputBody.innerHTML = body.replace(/\n/g, '<br>');
      SmartToolzAI.showToast('Email generated!');
    } finally {
      generateEmailBtn.disabled = false;
      generateEmailBtn.innerHTML = origBtnText;
    }
  }

  generateEmailBtn.addEventListener('click', generateEmail);

  copySubjectBtn.addEventListener('click', () => {
    const text = outputSubject.textContent.replace('Subject: ', '');
    SmartToolzAI.copyToClipboard(text);
  });

  copyBodyBtn.addEventListener('click', () => {
    const text = outputBody.innerText || outputBody.textContent;
    SmartToolzAI.copyToClipboard(text);
  });
});
