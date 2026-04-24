import { StarField } from "@/components/StarField"
import { ChevronDown, Phone, Wrench, Shield, Clock, TrendingUp, AlertTriangle } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

type IconName = string

export default function Index() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false)
  const [isBeforeAfterVisible, setIsBeforeAfterVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [initialHeight, setInitialHeight] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const contactSectionRef = useRef<HTMLElement>(null)
  const beforeAfterRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight)
    }
  }, [initialHeight])

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const maxBlur = 8
          const triggerHeight = initialHeight * 1.2
          const newBlurAmount = Math.min(maxBlur, (scrollRef.current / triggerHeight) * maxBlur)
          setBlurAmount(newBlurAmount)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => { window.removeEventListener("scroll", handleScroll) }
  }, [initialHeight])

  useEffect(() => {
    const headingObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsHeadingVisible(true); if (headingRef.current) headingObserver.unobserve(headingRef.current) }
    }, { threshold: 0.1 })
    if (headingRef.current) headingObserver.observe(headingRef.current)

    const aboutObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsAboutVisible(true); if (aboutContentRef.current) aboutObserver.unobserve(aboutContentRef.current) }
    }, { threshold: 0.1 })
    if (aboutContentRef.current) aboutObserver.observe(aboutContentRef.current)

    const servicesObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsServicesVisible(true); if (servicesContentRef.current) servicesObserver.unobserve(servicesContentRef.current) }
    }, { threshold: 0.1 })
    if (servicesContentRef.current) servicesObserver.observe(servicesContentRef.current)

    const servicesTitleObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsServicesTitleVisible(true); if (servicesTitleRef.current) servicesTitleObserver.unobserve(servicesTitleRef.current) }
    }, { threshold: 0.1 })
    if (servicesTitleRef.current) servicesTitleObserver.observe(servicesTitleRef.current)

    const beforeAfterObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsBeforeAfterVisible(true); if (beforeAfterRef.current) beforeAfterObserver.unobserve(beforeAfterRef.current) }
    }, { threshold: 0.1 })
    if (beforeAfterRef.current) beforeAfterObserver.observe(beforeAfterRef.current)

    return () => {
      if (headingRef.current) headingObserver.unobserve(headingRef.current)
      if (aboutContentRef.current) aboutObserver.unobserve(aboutContentRef.current)
      if (servicesContentRef.current) servicesObserver.unobserve(servicesContentRef.current)
      if (servicesTitleRef.current) servicesTitleObserver.unobserve(servicesTitleRef.current)
      if (beforeAfterRef.current) beforeAfterObserver.unobserve(beforeAfterRef.current)
    }
  }, [])

  const scaleFactor = 1 + blurAmount / 16
  const warpSpeedStyle = { transform: `scale(${scaleFactor})`, transition: "transform 0.2s ease-out" }

  const scrollToAbout = () => {
    if (aboutSectionRef.current) aboutSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  const scrollToContact = () => {
    if (contactSectionRef.current) contactSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const heroStyle = { height: initialHeight ? `${initialHeight}px` : "100vh" }

  const beforeItems = [
    { icon: "AlertTriangle", text: "Простои техники — срыв сроков строительства" },
    { icon: "TrendingUp", text: "Расходы на ремонт съедают прибыль объекта" },
    { icon: "Clock", text: "Поиск запчастей на Scania занимает недели" },
    { icon: "Wrench", text: "Гидравлика, стрела и насос изношены до предела" },
  ]

  const afterItems = [
    { icon: "Shield", text: "Техника работает без аварийных остановок" },
    { icon: "TrendingUp", text: "Ресурс машины продлён ещё на 5–10 лет" },
    { icon: "Clock", text: "Сдача в срок — репутация компании защищена" },
    { icon: "Wrench", text: "Полная диагностика и гарантия на все узлы" },
  ]

  const services = [
    {
      icon: "Wrench",
      title: "Диагностика и дефектовка",
      desc: "Полный осмотр насосного агрегата, стрелы, гидравлики и шасси Scania. Подробный отчёт о состоянии узлов.",
    },
    {
      icon: "Settings",
      title: "Восстановление гидравлики",
      desc: "Замена гидроцилиндров, насосов, распределителей и шлангов. Настройка давления по заводским параметрам.",
    },
    {
      icon: "Shield",
      title: "Ремонт стрелы и секций",
      desc: "Рихтовка, сварка и замена секций стрелы. Ревизия поворотного механизма и системы блокировок.",
    },
    {
      icon: "Truck",
      title: "Восстановление шасси Scania",
      desc: "Ремонт двигателя, коробки передач, рамы и ходовой части. Специализация — 4-осные шасси с пробегом от 10 лет.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-black" style={heroStyle}>
        <div className="absolute top-6 right-6 z-10 flex space-x-3">
          <Button
            onClick={scrollToContact}
            variant="outline"
            size="sm"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
          >
            Получить расчёт
          </Button>
        </div>

        <div className="absolute inset-0" style={warpSpeedStyle}>
          <StarField blurAmount={blurAmount} />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center px-4">
            <div
              className="backdrop-blur-sm px-6 py-6 rounded-lg inline-block relative"
              style={{ background: "radial-gradient(circle, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 100%)" }}
            >
              <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
                Восстановительный ремонт
              </p>
              <h1 className="text-4xl font-bold text-white md:text-6xl font-heading leading-tight">
                Автобетонасос Scania<br />
                <span className="text-orange-400">живёт ещё 10 лет</span>
              </h1>
              <p className="mt-5 text-lg text-gray-300 md:text-xl max-w-2xl mx-auto">
                Полное восстановление 4-осных бетонасосов с пробегом более 10 лет.<br />
                Гидравлика, стрела, насосный агрегат и шасси — под ключ.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white border-0 font-semibold px-8"
                >
                  <Icon name="Phone" size={16} className="mr-2" />
                  Получить расчёт бесплатно
                </Button>
                <Button
                  onClick={scrollToAbout}
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
                >
                  Узнать подробнее
                </Button>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-20 animate-bounce cursor-pointer"
            onClick={scrollToAbout}
            role="button"
            aria-label="Прокрутить вниз"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") scrollToAbout() }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </section>

      {/* БЫЛО / СТАЛО */}
      <section ref={aboutSectionRef} id="about" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div
            ref={aboutContentRef}
            className={cn(
              "max-w-5xl mx-auto transition-all duration-1000 ease-out",
              isAboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-4">
              Узнайте себя в этой истории
            </h2>
            <p className="text-gray-400 text-center mb-14 text-lg max-w-2xl mx-auto">
              Директора строительных и транспортных компаний сталкиваются с одними и теми же проблемами — и находят одно решение.
            </p>

            <div
              ref={beforeAfterRef}
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden transition-all duration-1000 ease-out",
                isBeforeAfterVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
            >
              {/* БЫЛО */}
              <div className="bg-gray-800 p-8 border-b md:border-b-0 md:border-r border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-900/60 flex items-center justify-center">
                    <Icon name="AlertTriangle" size={20} className="text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-red-400">БЫЛО</h3>
                </div>
                <ul className="space-y-5">
                  {beforeItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-red-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name={item.icon as IconName} size={14} className="text-red-400" />
                      </div>
                      <p className="text-gray-300">{item.text}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-red-900/20 rounded-lg border border-red-900/40">
                  <p className="text-red-300 text-sm italic">
                    «Машина стоит — объект встал. Каждый день простоя — это деньги из кармана.»
                  </p>
                </div>
              </div>

              {/* СТАЛО */}
              <div className="bg-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-900/60 flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-green-400">СТАЛО</h3>
                </div>
                <ul className="space-y-5">
                  {afterItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-green-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name={item.icon as IconName} size={14} className="text-green-400" />
                      </div>
                      <p className="text-gray-300">{item.text}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-green-900/20 rounded-lg border border-green-900/40">
                  <p className="text-green-300 text-sm italic">
                    «После восстановления машина работает как новая. Окупилось за один сезон.»
                  </p>
                </div>
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { value: "10+", label: "лет опыта ремонта Scania" },
                { value: "50+", label: "восстановленных машин" },
                { value: "5–10", label: "лет дополнительного ресурса" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <p className="text-3xl font-bold text-orange-400 font-heading">{stat.value}</p>
                  <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section ref={servicesSectionRef} id="services" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2
            ref={servicesTitleRef}
            className={cn(
              "mb-4 text-center text-3xl md:text-4xl font-bold font-heading transition-all duration-1000 ease-out",
              isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Что входит в восстановительный ремонт
          </h2>
          <p className={cn(
            "text-center text-gray-400 mb-12 text-lg max-w-2xl mx-auto transition-all duration-1000 ease-out",
            isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}>
            Комплексный подход: от диагностики до ввода машины в эксплуатацию
          </p>
          <div
            ref={servicesContentRef}
            className={cn(
              "max-w-5xl mx-auto transition-all duration-1000 ease-out",
              isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:bg-gray-700 border border-gray-700 hover:border-orange-500/40">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mr-4">
                      <Icon name={s.icon as IconName} size={20} className="text-orange-400" />
                    </div>
                    <h3 className="text-xl font-semibold font-heading">{s.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA под услугами */}
            <div className="mt-12 text-center bg-gradient-to-r from-orange-900/30 to-orange-800/20 rounded-2xl p-8 border border-orange-500/20">
              <h3 className="text-2xl font-bold font-heading mb-3">Готовы восстановить вашу машину?</h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Оставьте заявку — мы бесплатно проконсультируем и рассчитаем стоимость ремонта для вашего бетонасоса.
              </p>
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white border-0 font-semibold px-10"
              >
                <Icon name="Phone" size={16} className="mr-2" />
                Получить расчёт
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section ref={contactSectionRef} id="contact" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2
            ref={headingRef}
            className={cn(
              "mb-3 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out",
              isHeadingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Получите бесплатный расчёт
          </h2>
          <p className={cn(
            "text-center text-gray-500 mb-10 transition-all duration-1000 ease-out",
            isHeadingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}>
            Опишите состояние машины — мы свяжемся в течение 2 часов в рабочее время
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}