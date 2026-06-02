import { useState } from 'react';
import { useNavigate } from 'react-router';
import { IconMail, IconLock, IconEye, IconEyeOff, IconAlertCircle, IconLoader } from '@tabler/icons-react';
import styles from './login-form.module.css';

interface LoginFormProps {
  onForgotPassword: () => void;
}

// Valida o formato básico do e-mail.
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError =
    touched.email && !email
      ? 'E-mail obrigatório.'
      : touched.email && !isValidEmail(email)
      ? 'Formato de e-mail inválido.'
      : '';

  const passwordError =
    touched.password && !password ? 'Senha obrigatória.' : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setGlobalError('');

    if (!email || !isValidEmail(email) || !password) {
      setGlobalError('Verifique os campos destacados e tente novamente.');
      return;
    }

    // Simula a autenticação e envia para o painel.
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      noValidate
      aria-label="Formulário de autenticação"
    >
      {globalError && (
        <div className={styles.errorBanner} role="alert" aria-live="assertive">
          <IconAlertCircle size={16} aria-hidden="true" />
          <span>{globalError}</span>
        </div>
      )}

      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label htmlFor="login-email" className={styles.label}>
            E-mail
          </label>
          <div
            className={[
              styles.inputWrapper,
              emailError ? styles.inputWrapperError : '',
            ].join(' ')}
          >
            <IconMail size={16} className={styles.inputIcon} aria-hidden="true" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              className={styles.input}
              placeholder="seu@email.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, email: true }))}
              aria-required="true"
              aria-describedby={emailError ? 'email-error' : undefined}
              aria-invalid={!!emailError}
              disabled={isLoading}
            />
          </div>
          {emailError && (
            <span id="email-error" className={styles.fieldError} role="alert">
              <IconAlertCircle size={12} aria-hidden="true" />
              {emailError}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="login-password" className={styles.label}>
              Senha
            </label>
            <button
              type="button"
              className={styles.forgotLink}
              onClick={onForgotPassword}
              aria-label="Abrir modal de recuperação de senha"
              disabled={isLoading}
            >
              Esqueci minha senha
            </button>
          </div>
          <div
            className={[
              styles.inputWrapper,
              passwordError ? styles.inputWrapperError : '',
            ].join(' ')}
          >
            <IconLock size={16} className={styles.inputIcon} aria-hidden="true" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className={styles.input}
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, password: true }))}
              aria-required="true"
              aria-describedby={passwordError ? 'password-error' : undefined}
              aria-invalid={!!passwordError}
              disabled={isLoading}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              tabIndex={0}
              disabled={isLoading}
            >
              {showPassword ? (
                <IconEyeOff size={16} aria-hidden="true" />
              ) : (
                <IconEye size={16} aria-hidden="true" />
              )}
            </button>
          </div>
          {passwordError && (
            <span id="password-error" className={styles.fieldError} role="alert">
              <IconAlertCircle size={12} aria-hidden="true" />
              {passwordError}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <IconLoader size={18} className={styles.spinner} aria-hidden="true" />
              Entrando…
            </>
          ) : (
            'Entrar'
          )}
        </button>
      </div>
    </form>
  );
}
