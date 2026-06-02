import { useState, useRef } from 'react';
import {
  IconUser,
  IconLock,
  IconCheck,
  IconAlertCircle,
  IconCamera,
  IconX,
} from '@tabler/icons-react';
import { useAppContext } from '~/hooks/use-app-context';
import type { Route } from './+types/settings';
import styles from './settings.module.css';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Gerenciar Perfil – CDD' }];
}

interface Feedback {
  type: 'success' | 'error';
  message: string;
}

function FeedbackAlert({ feedback, onClose }: { feedback: Feedback; onClose: () => void }) {
  return (
    <div className={[styles.feedback, feedback.type === 'error' ? styles.feedbackError : styles.feedbackSuccess].join(' ')}>
      <span className={styles.feedbackIcon}>
        {feedback.type === 'success' ? <IconCheck size={16} /> : <IconAlertCircle size={16} />}
      </span>
      <span className={styles.feedbackText}>{feedback.message}</span>
      <button type="button" className={styles.feedbackClose} onClick={onClose} aria-label="Fechar">
        <IconX size={14} />
      </button>
    </div>
  );
}

export default function Settings() {
  const { user, updateUser } = useAppContext();

  // Foto de perfil.
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFeedback, setAvatarFeedback] = useState<Feedback | null>(null);

  // Dados pessoais
  const [profileForm, setProfileForm] = useState({ name: user.name, email: user.email });
  const [profileDirty, setProfileDirty] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState<Feedback | null>(null);

  // Alterar senha
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [passwordFeedback, setPasswordFeedback] = useState<Feedback | null>(null);

  /* Avatar */
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setAvatarFeedback({ type: 'error', message: 'Arquivo inválido. Envie uma imagem (JPG, PNG, etc).' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarSrc(ev.target?.result as string);
      setAvatarFeedback({ type: 'success', message: 'Foto de perfil atualizada com sucesso!' });
      setTimeout(() => setAvatarFeedback(null), 3500);
    };
    reader.readAsDataURL(file);
  };

  /* Dados pessoais */
  const handleProfileChange = (field: 'name' | 'email', value: string) => {
    setProfileForm((p) => ({ ...p, [field]: value }));
    setProfileDirty(true);
  };

  const handleProfileCancel = () => {
    setProfileForm({ name: user.name, email: user.email });
    setProfileDirty(false);
    setProfileFeedback(null);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.name.trim()) {
      setProfileFeedback({ type: 'error', message: 'O campo Nome é obrigatório.' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileForm.email)) {
      setProfileFeedback({ type: 'error', message: 'Informe um e-mail válido.' });
      return;
    }
    updateUser({ name: profileForm.name.trim(), email: profileForm.email.trim() });
    setProfileDirty(false);
    setProfileFeedback({ type: 'success', message: 'Dados pessoais salvos com sucesso!' });
    setTimeout(() => setProfileFeedback(null), 3500);
  };

  /* Alterar senha */
  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);
    if (!passwordForm.current) {
      setPasswordFeedback({ type: 'error', message: 'Informe sua senha atual.' });
      return;
    }
    if (passwordForm.next.length < 6) {
      setPasswordFeedback({ type: 'error', message: 'A nova senha deve ter pelo menos 6 caracteres.' });
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordFeedback({ type: 'error', message: 'A nova senha e a confirmação não coincidem.' });
      return;
    }
    setPasswordForm({ current: '', next: '', confirm: '' });
    setPasswordFeedback({ type: 'success', message: 'Senha atualizada com sucesso!' });
    setTimeout(() => setPasswordFeedback(null), 3500);
  };

  const handlePasswordCancel = () => {
    setPasswordForm({ current: '', next: '', confirm: '' });
    setPasswordFeedback(null);
  };

  const initials = user.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Gerenciar Perfil</h1>
        <p className={styles.pageSubtitle}>Atualize suas informações pessoais e segurança da conta</p>
      </div>

      {/* Foto de perfil */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon} aria-hidden="true"><IconUser size={20} /></div>
          <div>
            <h2 className={styles.sectionTitle}>Foto de Perfil</h2>
            <p className={styles.sectionDesc}>Clique na foto para enviar uma nova imagem</p>
          </div>
        </div>

        <div className={styles.avatarArea}>
          <div className={styles.avatarWrap}>
            {avatarSrc ? (
              <img src={avatarSrc} alt="Foto de perfil" className={styles.avatarImg} />
            ) : (
              <span className={styles.avatarInitials}>{initials}</span>
            )}
            <button
              type="button"
              className={styles.avatarUploadBtn}
              onClick={() => fileInputRef.current?.click()}
              aria-label="Alterar foto de perfil"
            >
              <IconCamera size={16} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleAvatarChange}
              aria-hidden="true"
            />
          </div>
          <div className={styles.avatarInfo}>
            <p className={styles.avatarName}>{user.name}</p>
            <p className={styles.avatarEmail}>{user.email}</p>
            <button
              type="button"
              className={styles.avatarTextBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              <IconCamera size={14} /> Alterar foto
            </button>
          </div>
        </div>

        {avatarFeedback && (
          <FeedbackAlert feedback={avatarFeedback} onClose={() => setAvatarFeedback(null)} />
        )}
      </div>

      {/* Dados pessoais */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon} aria-hidden="true"><IconUser size={20} /></div>
          <div>
            <h2 className={styles.sectionTitle}>Dados Pessoais</h2>
            <p className={styles.sectionDesc}>Atualize seu nome e endereço de e-mail</p>
          </div>
        </div>

        <form onSubmit={handleProfileSave} className={styles.form} noValidate>
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="profileName">
                Nome <span className={styles.required}>*</span>
              </label>
              <input
                id="profileName"
                type="text"
                className={styles.input}
                value={profileForm.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                placeholder="Seu nome completo"
                autoComplete="name"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="profileEmail">
                E-mail <span className={styles.required}>*</span>
              </label>
              <input
                id="profileEmail"
                type="email"
                className={styles.input}
                value={profileForm.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                placeholder="seu@email.com"
                autoComplete="email"
              />
            </div>
          </div>

          {profileFeedback && (
            <FeedbackAlert feedback={profileFeedback} onClose={() => setProfileFeedback(null)} />
          )}

          <div className={styles.formFooter}>
            {profileDirty && (
              <button type="button" className={styles.cancelBtn} onClick={handleProfileCancel}>
                Cancelar
              </button>
            )}
            <button type="submit" className={styles.saveBtn}>
              Salvar alterações
            </button>
          </div>
        </form>
      </div>

      {/* Alterar senha */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={[styles.sectionIcon, styles.securityIcon].join(' ')} aria-hidden="true">
            <IconLock size={20} />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Alterar Senha</h2>
            <p className={styles.sectionDesc}>Mantenha sua conta segura com uma senha forte</p>
          </div>
        </div>

        <form onSubmit={handlePasswordSave} className={styles.form} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="currentPassword">
              Senha atual <span className={styles.required}>*</span>
            </label>
            <input
              id="currentPassword"
              type="password"
              className={styles.input}
              placeholder="Digite sua senha atual"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm((p) => ({ ...p, current: e.target.value }))}
              autoComplete="current-password"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="newPassword">
                Nova senha <span className={styles.required}>*</span>
              </label>
              <input
                id="newPassword"
                type="password"
                className={styles.input}
                placeholder="Mínimo 6 caracteres"
                value={passwordForm.next}
                onChange={(e) => setPasswordForm((p) => ({ ...p, next: e.target.value }))}
                autoComplete="new-password"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirmPassword">
                Confirmar nova senha <span className={styles.required}>*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={styles.input}
                placeholder="Repita a nova senha"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm((p) => ({ ...p, confirm: e.target.value }))}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className={styles.passwordHint}>
            <IconAlertCircle size={13} />
            Use pelo menos 6 caracteres, misturando letras e números.
          </div>

          {passwordFeedback && (
            <FeedbackAlert feedback={passwordFeedback} onClose={() => setPasswordFeedback(null)} />
          )}

          <div className={styles.formFooter}>
            <button type="button" className={styles.cancelBtn} onClick={handlePasswordCancel}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveBtn}>
              Atualizar senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
