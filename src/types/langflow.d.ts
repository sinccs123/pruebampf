declare global {
  namespace JSX {
    interface IntrinsicElements {
      'langflow-chat': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        window_title?: string;
        flow_id?: string;
        host_url?: string;
        chat_position?: string;
        online_message?: string;
        placeholder?: string;
        placeholder_sending?: string;
        class?: string;
        chat_trigger_style?: string;
        user_message_style?: string;
        height?: number;
        width?: number;
        api_key?: string;
        tweaks?: string;
        image_chat_trigger_open?: string;
        image_chat_trigger_close?: string;
      };
    }
  }
}

export {};
