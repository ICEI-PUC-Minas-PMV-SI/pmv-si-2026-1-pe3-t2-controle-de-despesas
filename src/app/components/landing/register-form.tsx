import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '~/hooks/use-app-context';
import {
  IconMail,
  IconLock,
  IconUser,
  IconEye,
  IconEyeOff,
  IconAlertCircle,
  IconCircleCheck,
  IconLoader,
  IconArrowRight,
} from '@tabler/icons-react';
import styles from './register-form.module.css';

interface FieldState {
  value: string;
  touched: boolean;
}

type StrengthLevel = 'fraca' | 'média' | 'forte' | 'muito forte';

interface PasswordStrength {
  score: number;
  label: StrengthLevel;
  color: string;
  checks: PasswordCheck[];
}

interface PasswordCheck {
  label: string;
  passed: boolean;
}

const REDIRECT_SECONDS = 5;
const LOGIN_ROUTE = '/';

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// Calcula a força da senha com base nos requisitos definidos.
function getPasswordStrength(password: string): PasswordStrength {
  const checks: PasswordCheck[] = [
    { label: 'Mínimo de 8 caracteres',          passed: password.length >= 8 },
    { label: 'Letra maiúscula (A–Z)',             passed: /[A-Z]/.test(password) },
    { label: 'Letra minúscula (a–z)',             passed: /[a-z]/.test(password) },
    { label: 'Número (0–9)',                      passed: /\d/.test(password) },
    { label: 'Caractere especial (!@#$…)',        passed: /[^\w\s]/.test(password) },
  ];

  const score = checks.filter((c) => c.passed).length;

  const map: Record<number, { label: StrengthLevel; color: string }> = {
    0: { label: 'fraca',       color: 'var(--color-danger)' },
    1: { label: 'fraca',       color: 'var(--color-danger)' },
    2: { label: 'média',       color: 'var(--color-warning)' },
    3: { label: 'média',       color: 'var(--color-warning)' },
    4: { label: 'forte',       color: 'var(--color-secondary)' },
    5: { label: 'muito forte', color: 'var(--color-secondary)' },
  };

  return { score, checks, ...map[score] };
}

export function RegisterForm() {
  const navigate = useNavigate();
  const { updateUser } = useAppContext();

  const [name,     setName]     = useState<FieldState>({ value: '', touched: false });
  const [email,    setEmail]    = useState<FieldState>({ value: '', touched: false });
  const [password, setPassword] = useState<FieldState>({ value: '', touched: false });
  const [confirm,  setConfirm]  = useState<FieldState>({ value: '', touched: false });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [isLoading,    setIsLoading]    = useState(false);
  const [isSuccess,    setIsSuccess]    = useState(false);
  const [countdown,    setCountdown]    = useState(REDIRECT_SECONDS);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Calcula a força da senha em tempo real.
  const strength = getPasswordStrength(password.value);

  // Mensagens de erro exibidas abaixo de cada campo.
  const nameError =
    name.touched && !name.value.trim()
      ? 'Nome completo é obrigatório.'
      : name.touched && name.value.trim().split(' ').length < 2
      ? 'Informe nome e sobrenome.'
      : '';

  const emailError =
    email.touched && !email.value
      ? 'E-mail é obrigatório.'
      : email.touched && !isValidEmail(email.value)
      ? 'Formato de e-mail inválido.'
      : '';

  const passwordError =
    password.touched && !password.value
      ? 'Senha é obrigatória.'
      : password.touched && password.value.length < 8
      ? 'A senha deve ter pelo menos 8 caracteres.'
      : '';

  const confirmError =
    confirm.touched && !confirm.value
      ? 'Confirme sua senha.'
      : confirm.touched && confirm.value !== password.value
      ? 'As senhas não coincidem.'
      : '';

  const hasErrors = !!(nameError || emailError || passwordError || confirmError);
  const allFilled = !!(name.value.trim() && email.value && password.value && confirm.value);

  // Após cadastrar, redireciona automaticamente para a tela de login.
  useEffect(() => {
    if (!isSuccess) return;

    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current!);
          navigate(LOGIN_ROUTE);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSuccess, navigate]);

  const handleGoNow = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigate(LOGIN_ROUTE);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Marca todos os campos para mostrar erros, se existirem.
    setName((p)     => ({ ...p, touched: true }));
    setEmail((p)    => ({ ...p, touched: true }));
    setPassword((p) => ({ ...p, touched: true }));
    setConfirm((p)  => ({ ...p, touched: true }));

    if (
      !name.value.trim() ||
      name.value.trim().split(' ').length < 2 ||
      !isValidEmail(email.value) ||
      password.value.length < 8 ||
      password.value !== confirm.value
    ) {
      return;
    }

    updateUser({
      name: name.value.trim(),
      email: email.value.trim(),
    });

    // Simula a criação da conta para fins de protótipo.
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <div className={styles.successIcon} aria-hidden="true">
          <IconCircleCheck size={48} stroke={1.5} />
        </div>
        <h2 className={styles.successTitle}>Cadastro realizado!</h2>
        <p className={styles.successText}>
          Sua conta foi criada com sucesso. Bem-vindo ao CDD!
        </p>
        <p className={styles.successTimer}>
          Redirecionando para o login em{' '}
          <strong>{countdown}</strong>{' '}
          segundo{countdown !== 1 ? 's' : ''}…
        </p>
        <button
          type="button"
          className={styles.successBtn}
          onClick={handleGoNow}
        >
          Ir para o login agora
          <IconArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      noValidate
      aria-label="Formulário de cadastro"
    >
      <div className={styles.fieldGroup}>
        <Field
          id="reg-name"
          label="Nome completo"
          error={nameError}
          errorId="name-error"
          icon={<IconUser size={16} aria-hidden="true" />}
        >
          <input
            id="reg-name"
            type="text"
            autoComplete="name"
            className={styles.input}
            placeholder="Maria da Silva"
            value={name.value}
            onChange={(e) => setName({ value: e.target.value, touched: true })}
            onBlur={() => setName((p) => ({ ...p, touched: true }))}
            aria-required="true"
            aria-describedby={nameError ? 'name-error' : undefined}
            aria-invalid={!!nameError}
            disabled={isLoading}
          />
        </Field>

        <Field
          id="reg-email"
          label="E-mail"
          error={emailError}
          errorId="email-error"
          icon={<IconMail size={16} aria-hidden="true" />}
        >
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            className={styles.input}
            placeholder="maria@email.com.br"
            value={email.value}
            onChange={(e) => setEmail({ value: e.target.value, touched: true })}
            onBlur={() => setEmail((p) => ({ ...p, touched: true }))}
            aria-required="true"
            aria-describedby={emailError ? 'email-error' : undefined}
            aria-invalid={!!emailError}
            disabled={isLoading}
          />
        </Field>

        <div className={styles.field}>
          <label htmlFor="reg-password" className={styles.label}>
            Senha
          </label>
          <div
            className={[
              styles.inputWrapper,
              passwordError ? styles.inputWrapperError : '',
              password.touched && !passwordError && password.value ? styles.inputWrapperValid : '',
            ].join(' ')}
          >
            <span className={styles.inputLeadIcon}>
              <IconLock size={16} aria-hidden="true" />
            </span>
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className={styles.input}
              placeholder="Crie uma senha segura"
              value={password.value}
              onChange={(e) => setPassword({ value: e.target.value, touched: true })}
              onBlur={() => setPassword((p) => ({ ...p, touched: true }))}
              aria-required="true"
              aria-describedby="password-strength password-error"
              aria-invalid={!!passwordError}
              disabled={isLoading}
            />
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              disabled={isLoading}
            >
              {showPassword ? <IconEyeOff size={16} aria-hidden="true" /> : <IconEye size={16} aria-hidden="true" />}
            </button>
          </div>

          {password.value.length > 0 && (
            <div id="password-strength" className={styles.strengthBlock} aria-label={`Força da senha: ${strength.label}`}>
              <div className={styles.strengthBar}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className={styles.strengthSegment}
                    style={{
                      background: n <= strength.score ? strength.color : 'var(--color-border)',
                    }}
                  />
                ))}
              </div>
              <span className={styles.strengthLabel} style={{ color: strength.color }}>
                Força: {strength.label}
              </span>
              <ul className={styles.checkList} aria-label="Requisitos de senha">
                {strength.checks.map((c) => (
                  <li
                    key={c.label}
                    className={[
                      styles.checkItem,
                      c.passed ? styles.checkPassed : styles.checkFailed,
                    ].join(' ')}
                  >
                    {c.passed ? (
                      <IconCircleCheck size={12} aria-hidden="true" />
                    ) : (
                      <IconAlertCircle size={12} aria-hidden="true" />
                    )}
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {passwordError && (
            <span id="password-error" className={styles.fieldError} role="alert">
              <IconAlertCircle size={12} aria-hidden="true" />
              {passwordError}
            </span>
          )}
        </div>

        <Field
          id="reg-confirm"
          label="Confirmar senha"
          error={confirmError}
          errorId="confirm-error"
          icon={<IconLock size={16} aria-hidden="true" />}
          trailingIcon={
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? 'Ocultar confirmação' : 'Mostrar confirmação'}
              disabled={isLoading}
            >
              {showConfirm ? <IconEyeOff size={16} aria-hidden="true" /> : <IconEye size={16} aria-hidden="true" />}
            </button>
          }
          isValid={confirm.touched && !confirmError && !!confirm.value}
        >
          <input
            id="reg-confirm"
            type={showConfirm ? 'text' : 'password'}
            autoComplete="new-password"
            className={styles.input}
            placeholder="Repita a senha"
            value={confirm.value}
            onChange={(e) => setConfirm({ value: e.target.value, touched: true })}
            onBlur={() => setConfirm((p) => ({ ...p, touched: true }))}
            aria-required="true"
            aria-describedby={confirmError ? 'confirm-error' : undefined}
            aria-invalid={!!confirmError}
            disabled={isLoading}
          />
        </Field>
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
            Criando conta…
          </>
        ) : (
          'Cadastrar'
        )}
      </button>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error: string;
  errorId: string;
  icon: React.ReactNode;
  trailingIcon?: React.ReactNode;
  isValid?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, errorId, icon, trailingIcon, isValid, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div
        className={[
          styles.inputWrapper,
          error ? styles.inputWrapperError : '',
          isValid ? styles.inputWrapperValid : '',
        ].join(' ')}
      >
        <span className={styles.inputLeadIcon}>{icon}</span>
        {children}
        {trailingIcon}
      </div>
      {error && (
        <span id={errorId} className={styles.fieldError} role="alert">
          <IconAlertCircle size={12} aria-hidden="true" />
          {error}
        </span>
      )}
    </div>
  );
}
