import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher.tsx'

export default function Login() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError(t('login.errorRequired'))
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4">
      {/* Сетка-подложка */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Кровавые свечения */}
      <motion.div
        className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-blood-700/40 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 60, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-blood-800/50 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, -40, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-blood-600/20 blur-[100px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Переключатель языка */}
      <div className="absolute right-4 top-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Карточка */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-blood-900/40 backdrop-blur-xl">
          {/* Логотип и заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blood-600 to-blood-800 shadow-lg shadow-blood-700/50">
              <span className="text-2xl font-bold text-white">V</span>
              <motion.span
                className="absolute inset-0 rounded-2xl ring-1 ring-blood-400/40"
                animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {t('login.title')}
            </h1>
            <p className="mt-1 text-sm text-white/40">{t('login.subtitle')}</p>
          </motion.div>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              icon={<Mail className="h-4 w-4" />}
              type="email"
              placeholder={t('login.emailPlaceholder')}
              value={email}
              onChange={setEmail}
              delay={0.25}
            />

            <Field
              icon={<Lock className="h-4 w-4" />}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('login.passwordPlaceholder')}
              value={password}
              onChange={setPassword}
              delay={0.32}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-white/40 transition-colors hover:text-blood-400"
                  aria-label={
                    showPassword ? t('login.hidePassword') : t('login.showPassword')
                  }
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            {/* Ошибка */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="text-xs text-blood-400"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Кнопка */}
            <motion.button
              type="submit"
              disabled={loading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="group relative mt-2 flex h-11 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blood-600 to-blood-800 font-medium text-white shadow-lg shadow-blood-900/50 transition-shadow hover:shadow-blood-700/60 disabled:opacity-70"
            >
              <AnimatePresence mode="wait" initial={false}>
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    {t('login.submitting')}
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2"
                  >
                    {t('login.submit')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-center text-xs text-white/25"
        >
          {t('login.footer')}
        </motion.p>
      </motion.div>
    </div>
  )
}

/* ----------------- Поле ввода ----------------- */

type FieldProps = {
  icon: React.ReactNode
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  delay?: number
  rightSlot?: React.ReactNode
}

function Field({
  icon,
  type,
  placeholder,
  value,
  onChange,
  delay = 0,
  rightSlot,
}: FieldProps) {
  const [focused, setFocused] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div
        className={`flex items-center gap-3 rounded-xl border bg-white/[0.03] px-4 transition-all duration-300 ${
          focused
            ? 'border-blood-500/60 bg-white/[0.06] shadow-lg shadow-blood-900/40'
            : 'border-white/10'
        }`}
      >
        <span className={`transition-colors ${focused ? 'text-blood-400' : 'text-white/40'}`}>
          {icon}
        </span>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 flex-1 bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
        />
        {rightSlot}
      </div>
    </motion.div>
  )
}