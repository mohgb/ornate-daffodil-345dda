/* ============================================================================
   ContactForm — the accessible, validated contact form (right-hand column).
   Fields: full name, company, e-mail, phone, subject (select), message, and a
   required privacy consent checkbox. Validation is client-side, on blur and on
   submit; the first invalid field receives focus, each error is wired via
   aria-describedby + role="alert". On success the form is swapped for a
   confirmation panel.

   NOTE: this is a static SPA with no backend — submission is SIMULATED (a short
   pending state, then success). Wire `postContact()` below to a real endpoint
   to make it live; nothing else needs to change.
   ========================================================================== */
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { contactSubjects } from '../../data/contact'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Loose international phone check (optional field): digits, spaces, + ( ) - .
const PHONE_RE = /^[+()\d][\d\s().-]{5,}$/

const EMPTY = { name: '', company: '', email: '', phone: '', subject: '', message: '', consent: false }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Veuillez indiquer votre nom complet.'
  if (!values.email.trim()) errors.email = 'Veuillez indiquer votre e-mail.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Cet e-mail ne semble pas valide.'
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim()))
    errors.phone = 'Ce numéro ne semble pas valide.'
  if (!values.subject) errors.subject = 'Veuillez choisir un sujet.'
  if (!values.message.trim()) errors.message = 'Veuillez décrire votre besoin.'
  else if (values.message.trim().length < 10) errors.message = 'Merci de détailler un peu plus (10 caractères min.).'
  if (!values.consent) errors.consent = 'Veuillez accepter la politique de confidentialité.'
  return errors
}

// Simulated network call. Replace the body with a real fetch() to go live.
function postContact(values) {
  return new Promise((resolve) => setTimeout(resolve, 900)) // eslint-disable-line no-unused-vars
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success
  const fields = useRef({})

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    // Clear an error as soon as the user corrects the field.
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const handleBlur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }))
    const fieldErrors = validate({ ...values })
    setErrors((e) => ({ ...e, [name]: fieldErrors[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fieldErrors = validate(values)
    setErrors(fieldErrors)
    setTouched({ name: true, email: true, phone: true, subject: true, message: true, consent: true })

    const firstError = Object.keys(fieldErrors).find((k) => fieldErrors[k])
    if (firstError) {
      fields.current[firstError]?.focus()
      return
    }

    setStatus('sending')
    await postContact(values)
    setStatus('success')
  }

  const err = (name) => (touched[name] ? errors[name] : undefined)
  const register = (name) => (el) => {
    if (el) fields.current[name] = el
  }

  if (status === 'success') {
    return (
      <div className="contact-form contact-form--done" role="status" aria-live="polite">
        <span className="contact-done__icon">
          <Icon name="check-circle" size={40} />
        </span>
        <h2 className="contact-done__title">Message envoyé</h2>
        <p className="contact-done__text">
          Merci {values.name.trim().split(' ')[0] || ''}, votre demande a bien été prise en
          compte. Nos équipes vous répondront dans les meilleurs délais.
        </p>
        <button
          type="button"
          className="btn btn--ghost-lime"
          onClick={() => {
            setValues(EMPTY)
            setErrors({})
            setTouched({})
            setStatus('idle')
          }}
        >
          <Icon name="arrow-right" size={18} />
          <span>Envoyer un autre message</span>
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-labelledby="contact-form-title">
      <h2 className="contact-form__title" id="contact-form-title">
        Écrivez-nous
      </h2>
      <p className="contact-form__hint">
        Les champs marqués <span className="contact-form__req" aria-hidden="true">*</span> sont
        obligatoires.
      </p>

      <div className="contact-form__grid">
        <Field
          name="name" label="Nom complet" required
          value={values.name} error={err('name')} register={register('name')}
          onChange={(v) => setField('name', v)} onBlur={() => handleBlur('name')}
          autoComplete="name" placeholder="Prénom Nom"
        />
        <Field
          name="company" label="Société"
          value={values.company} error={err('company')} register={register('company')}
          onChange={(v) => setField('company', v)} onBlur={() => handleBlur('company')}
          autoComplete="organization" placeholder="Nom de votre organisation"
        />
        <Field
          name="email" label="E-mail" type="email" required
          value={values.email} error={err('email')} register={register('email')}
          onChange={(v) => setField('email', v)} onBlur={() => handleBlur('email')}
          autoComplete="email" placeholder="vous@exemple.com"
        />
        <Field
          name="phone" label="Téléphone" type="tel"
          value={values.phone} error={err('phone')} register={register('phone')}
          onChange={(v) => setField('phone', v)} onBlur={() => handleBlur('phone')}
          autoComplete="tel" placeholder="+213 (0)00 00 00 00"
        />

        {/* Subject — full width */}
        <div className="contact-field contact-field--full">
          <label className="contact-field__label" htmlFor="c-subject">
            Sujet <span className="contact-form__req" aria-hidden="true">*</span>
          </label>
          <div className="contact-field__select-wrap">
            <select
              id="c-subject"
              name="subject"
              ref={register('subject')}
              className={`contact-field__control contact-field__select${err('subject') ? ' is-invalid' : ''}`}
              value={values.subject}
              onChange={(e) => setField('subject', e.target.value)}
              onBlur={() => handleBlur('subject')}
              required
              aria-required="true"
              aria-invalid={err('subject') ? 'true' : undefined}
              aria-describedby={err('subject') ? 'c-subject-err' : undefined}
            >
              <option value="" disabled>Choisissez un sujet…</option>
              {contactSubjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <Icon name="chevron" size={18} className="contact-field__chevron" />
          </div>
          {err('subject') && (
            <p className="contact-field__error" id="c-subject-err" role="alert">
              <Icon name="close" size={14} /> {err('subject')}
            </p>
          )}
        </div>

        {/* Message — full width */}
        <div className="contact-field contact-field--full">
          <label className="contact-field__label" htmlFor="c-message">
            Message <span className="contact-form__req" aria-hidden="true">*</span>
          </label>
          <textarea
            id="c-message"
            name="message"
            ref={register('message')}
            className={`contact-field__control contact-field__textarea${err('message') ? ' is-invalid' : ''}`}
            value={values.message}
            onChange={(e) => setField('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            rows={5}
            required
            aria-required="true"
            aria-invalid={err('message') ? 'true' : undefined}
            aria-describedby={err('message') ? 'c-message-err' : undefined}
            placeholder="Décrivez votre projet, vos enjeux ou votre question…"
          />
          {err('message') && (
            <p className="contact-field__error" id="c-message-err" role="alert">
              <Icon name="close" size={14} /> {err('message')}
            </p>
          )}
        </div>

        {/* Consent — full width */}
        <div className="contact-field contact-field--full">
          <label className="contact-consent">
            <input
              type="checkbox"
              name="consent"
              ref={register('consent')}
              className="contact-consent__input"
              checked={values.consent}
              onChange={(e) => setField('consent', e.target.checked)}
              onBlur={() => handleBlur('consent')}
              required
              aria-required="true"
              aria-invalid={err('consent') ? 'true' : undefined}
              aria-describedby={err('consent') ? 'c-consent-err' : undefined}
            />
            <span className="contact-consent__box" aria-hidden="true">
              <Icon name="check" size={16} />
            </span>
            <span className="contact-consent__text">
              J&rsquo;accepte que mes données soient traitées conformément à la{' '}
              <Link to="/confidentialite" className="contact-consent__link">
                politique de confidentialité
              </Link>
              . <span className="contact-form__req" aria-hidden="true">*</span>
            </span>
          </label>
          {err('consent') && (
            <p className="contact-field__error" id="c-consent-err" role="alert">
              <Icon name="close" size={14} /> {err('consent')}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — hidden from users; bots that fill it are ignored. */}
      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor="c-website">Ne pas remplir</label>
        <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form__foot">
        <button type="submit" className="btn btn--lime contact-form__submit" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <span className="contact-form__spinner" aria-hidden="true" />
              <span>Envoi en cours…</span>
            </>
          ) : (
            <>
              <Icon name="envelope" size={20} />
              <span>Envoyer le message</span>
              <Icon name="arrow-right" size={20} className="btn__trailing" />
            </>
          )}
        </button>
        <span className="contact-form__reassure">Réponse sous 24–48 h ouvrées.</span>
      </div>

      <span className="sr-only" aria-live="polite">
        {status === 'sending' ? 'Envoi du message en cours.' : ''}
      </span>
    </form>
  )
}

/* A single labelled text input with inline error. Kept local — the select,
   textarea and consent are bespoke above. */
function Field({
  name, label, type = 'text', required = false, value, error, onChange, onBlur, register,
  autoComplete, placeholder,
}) {
  const id = `c-${name}`
  return (
    <div className="contact-field">
      <label className="contact-field__label" htmlFor={id}>
        {label}{' '}
        {required && <span className="contact-form__req" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        ref={register}
        className={`contact-field__control${error ? ' is-invalid' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
      {error && (
        <p className="contact-field__error" id={`${id}-err`} role="alert">
          <Icon name="close" size={14} /> {error}
        </p>
      )}
    </div>
  )
}
