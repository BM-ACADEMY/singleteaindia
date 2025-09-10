// App.jsx or your main component
import React from "react";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import Logo from '../assets/logotea.jpg'

const Whatsappfloating = () => {
  return (
    <div>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp
        phoneNumber="+919952787198" // Replace with your WhatsApp number
        accountName="Single Tea"
        avatar={Logo}
        statusMessage="online"
        chatMessage="Hey! Describe your question, I'll respond Asap..."
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
    </div>
  );
};

export default Whatsappfloating;
