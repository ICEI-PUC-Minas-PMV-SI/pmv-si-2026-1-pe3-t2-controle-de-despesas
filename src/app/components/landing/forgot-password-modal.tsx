import { useState } from 'react';
import { IconX, IconSend, IconMailCheck, IconAlertCircle } from '@tabler/icons-react';
import styles from './forgot-password-modal.module.css';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ForgotPasswordModal({ onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Informe seu e-mail para continuar.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Formato de e-mail inválido.');
      return;
    }

    // Simula o envio do link de recuperação.
    setSubmitted(true);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-modal-title"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fechar modal de recuperação de senha"
          autoFocus
        >
          <IconX size={18} aria-hidden="true" />
        </button>

        {!submitted ? (
          <>
            <div className={styles.modalHeader}>
              <div className={styles.modalIconWrap} aria-hidden="true">
                <IconSend size={22} stroke={1.8} />
              </div>
              <h2 id="forgot-modal-title" className={styles.modalTitle}>
                Recuperar acesso
              </h2>
              <p className={styles.modalDesc}>
                Digite o e-mail cadastrado. Enviaremos um link para você redefinir sua senha.
              </p>
            </div>

            {error && (
              <div className={styles.errorBanner} role="alert">
                <IconAlertCircle size={15} aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="forgot-email" className={styles.label}>
                  E-mail cadastrado
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  className={styles.input}
                  placeholder="seu@email.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-required="true"
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.submitBtn}>
                  Enviar link
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIcon} aria-hidden="true">
              <IconMailCheck size={32} stroke={1.5} />
            </div>
            <h2 id="forgot-modal-title" className={styles.modalTitle}>
              Link enviado!
            </h2>
            <p className={styles.modalDesc}>
              Verifique sua caixa de entrada em{' '}
              <strong>{email}</strong>. O link expira em 30 minutos.
            </p>
            <button type="button" className={styles.submitBtn} onClick={onClose}>
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
