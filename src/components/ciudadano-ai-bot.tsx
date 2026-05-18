'use client';

// @ts-nocheck
import { CONFIG } from '@/lib/config';
import { Dictionary } from '@/lib/dictionary';
import { useEffect, useState } from 'react';

type CiudadanoAiBotProps = {
  dictionary: Dictionary;
  apiKey: string;
  title?: string;
};

export default function CiudadanoAiBot({
  dictionary,
  apiKey,
  title = CONFIG.LANGFLOW_EMBEDDED_CHAT_TITLE,
}: CiudadanoAiBotProps) {
  const { labels } = dictionary;
  const { aibot } = labels;
  const { onlineMessage, placeholder, placeholderSending } = aibot;
  const [chatDimensions, setChatDimensions] = useState({ height: 0, width: 0 });

  const calculateChatDimensions = () => {
    let isMobile = window.innerWidth < 768;
    return {
      height: window.innerHeight - (isMobile ? 75 : 100),
      width: isMobile ? window.innerWidth - 70 : 400,
    };
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setChatDimensions(calculateChatDimensions());
      const handleResize = () => setChatDimensions(calculateChatDimensions());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <>
      {apiKey.length === 0 ? (
        // @ts-ignore
        <langflow-chat
          window_title={title}
          flow_id={`${CONFIG.LANGFLOW_EMBEDDED_CHAT_FLOW_ID}`}
          host_url={`${CONFIG.LANGFLOW_EMBEDDED_CHAT_URL}`}
          chat_position='top-left'
          online_message={`${onlineMessage}`}
          placeholder={`${placeholder}`}
          placeholder_sending={`${placeholderSending}`}
          class='flex fixed bottom-2 right-2 md:bottom-4 md:right-6 lg:bottom-6 lg:right-8 z-10'
          user_message_style={`{"backgroundColor": "#006272"}`}
          height={chatDimensions.height}
          width={chatDimensions.width}
          chat_trigger_style={`{"backgroundColor": "transparent", "width": "${CONFIG.LANGFLOW_EMBEDDED_CHAT_TRIGGER_WIDTH}px", "height": "${CONFIG.LANGFLOW_EMBEDDED_CHAT_TRIGGER_HEIGHT}px"}`}
          image_chat_trigger_open='{"url": "images/leyIA_Icon_00.png", "width": "80", "height": "80", "alt": "lalala"}'
          image_chat_trigger_close='{"url": "images/leyIA_Icon_02.png", "width": "80", "height": "80", "alt": "lelele"}'
        >
          {/* @ts-ignore */}
        </langflow-chat>
      ) : (
        // @ts-ignore
        <langflow-chat
          api_key={apiKey}
          tweaks={`{"api_key": "${apiKey}"}`}
          window_title={title}
          flow_id={`${CONFIG.LANGFLOW_EMBEDDED_CHAT_FLOW_ID}`}
          host_url={`${CONFIG.LANGFLOW_EMBEDDED_CHAT_URL}`}
          chat_position='top-left'
          online_message={`${onlineMessage}`}
          placeholder={`${placeholder}`}
          placeholder_sending={`${placeholderSending}`}
          class='flex fixed bottom-2 right-2 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-10'
          user_message_style={`{"backgroundColor": "#006272"}`}
          height={chatDimensions.height}
          width={chatDimensions.width}
          chat_trigger_style={`{"backgroundColor": "transparent", "width": "${CONFIG.LANGFLOW_EMBEDDED_CHAT_TRIGGER_WIDTH}px", "height": "${CONFIG.LANGFLOW_EMBEDDED_CHAT_TRIGGER_HEIGHT}px"}`}
          image_chat_trigger_open='{"url": "images/leyIA_Icon_00.png", "width": "80", "height": "80", "alt": "lalala"}'
          image_chat_trigger_close='{"url": "images/leyIA_Icon_02.png", "width": "80", "height": "80", "alt": "lelele"}'
        >
          {/* @ts-ignore */}
        </langflow-chat>
      )}
    </>
  );
}
