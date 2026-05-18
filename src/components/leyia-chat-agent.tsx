"use client";

import { useEffect } from "react";

import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";
import { CONFIG } from "@/lib/config";

export default function LeyIAChatAgent() {
  useEffect(() => {
    createChat({
      webhookUrl: CONFIG.N8N_WEBHOOK_LEYIA_CHAT,
      initialMessages: [
        "Hola, soy leyIA del MPF de la Ciudad. ¿En qué puedo ayudarte?",
      ],
      defaultLanguage: "en",
      showWelcomeScreen: false,
      i18n: {
        en: {
          title: "",
          subtitle: "",
          footer: "",
          getStarted: "Nuevo chat",
          inputPlaceholder: "Escribí tu pregunta...",
          closeButtonTooltip: "Cerrar chat",
        },
      },
    });
  }, []);

  return <div></div>;
}
