import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Languages } from 'lucide-react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggle = () => {
    i18n.changeLanguage(i18n.language.startsWith('ru') ? 'en' : 'ru')
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white/70 backdrop-blur-md transition-colors hover:border-blood-500/40 hover:text-white"
    >
      <Languages className="h-3.5 w-3.5" />
      {i18n.language.startsWith('ru') ? 'RU' : 'EN'}
    </motion.button>
  )
}