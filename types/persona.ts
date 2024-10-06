export interface IPersonaItem {
  id:            string;
  content:       string;
  name:          string;
  gpt_model:     string;
  gpt_max_token: number;
  type:          string;
  data:          Data;
  status:        string;
  updated_at:    Date;
  user_id:       string;
  image:         null;
  description:   null;
  created_at:    Date;
  share_id:      string;
  user:          User;
  llm_model:     LlmModel;
}

export interface Data {
}

export interface LlmModel {
  deployment_id: string;
  name:          string;
  display_name:  string;
}

export interface User {
  username: string;
}
