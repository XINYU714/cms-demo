const EMAIL_PATTERN = /^([A-Za-z0-9_\-\.+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const ENGLISH_REGEX = /[a-zA-Z]/;
const NUMBER_AND_SPECIAL_CHAR_REGEX = /(?=.*\d)(?=.*[!@#$%^&*])/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*]/;
const URL_REGEX = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[^\s]*)?$/;
const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

export const requireRule = (value: any) => {
  if (Array.isArray(value) && value.length === 0) return '請至少新增一個項目';
  if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return '此欄位是必填項目';
  return true;
};

export const maxLengthRule = (maxLength: number) => (value: any) =>
  !value || String(value).length <= maxLength || `最多輸入${maxLength}個字`;

export const formatRule = (isValid: boolean) => isValid || '格式錯誤';

export const fileSizeRule = (size: number) => (value: any) =>
  !value || value < size || `檔案大小超過 ${size / 1024 / 1024} MB`;

export const confirmPasswordRule = (confirmValue: string) => (value: any) =>
  !value || value === confirmValue || '與上面密碼不符合';

export const emailRule = (value: any) =>
  !value || EMAIL_PATTERN.test(String(value)) || '信箱格式錯誤';

export const urlRule = (value: any) =>
  !value || URL_REGEX.test(String(value)) || 'URL格式錯誤';

export const youtubeRule = (value: any) =>
  !value || YOUTUBE_REGEX.test(String(value)) || 'Youtube格式錯誤';

export const passwordRuleWithMessages = [
  {
    rule: (value: any) => !value || (String(value).length >= 8 && String(value).length <= 20) || '長度需介於8到20字之間',
    message: '長度8-20字',
  },
  {
    rule: (value: any) => !value || ENGLISH_REGEX.test(String(value)) || '必須包含英文(區分大小寫)',
    message: '必須包含英文(區分大小寫)',
  },
  {
    rule: (value: any) => !value || NUMBER_AND_SPECIAL_CHAR_REGEX.test(String(value)) || '必須包含數字與特殊符號',
    message: '必須包含數字與特殊符號',
  },
  {
    rule: (value: any) => !value || SPECIAL_CHAR_REGEX.test(String(value)) || '必須包含特殊符號(如：! @ # $ % ^ & * 等)',
    message: '必須包含特殊符號(如：! @ # $ % ^ & * 等)',
  },
];

export const passwordRuleList = passwordRuleWithMessages.map((item) => item.rule);

