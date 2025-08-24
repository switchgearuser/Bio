document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle")
  const body = document.body
  const themeIcon = themeToggle.querySelector("i")

  // Список доступных тем для циклического переключения
  const themes = ["light", "dark", "ocean", "sunset", "forest", "rose", "mint", "amber"]

  // Проверяем сохраненную тему
  const savedTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)

  // Обработчик клика на кнопку переключения темы
  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const currentIndex = themes.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themes.length
    const newTheme = themes[nextIndex] || "light"

    // Добавляем анимацию переключения
    body.style.transition = "all 0.3s ease"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)

    // Добавляем эффект пульсации для кнопки
    themeToggle.style.animation = "pulse 0.6s ease-in-out"
    setTimeout(() => {
      themeToggle.style.animation = ""
    }, 600)
  })

  function updateThemeIcon(theme) {
    const themeToIcon = {
      light: { icon: "fas fa-moon", title: "Тема: Светлая (клик — тёмная)" },
      dark: { icon: "fas fa-sun", title: "Тема: Тёмная (клик — ocean)" },
      ocean: { icon: "fas fa-water", title: "Тема: Ocean (клик — sunset)" },
      sunset: { icon: "fas fa-cloud-sun", title: "Тема: Sunset (клик — forest)" },
      forest: { icon: "fas fa-leaf", title: "Тема: Forest (клик — rose)" },
      rose: { icon: "fas fa-heart", title: "Тема: Rose (клик — mint)" },
      mint: { icon: "fas fa-icicles", title: "Тема: Mint (клик — amber)" },
      amber: { icon: "fas fa-star", title: "Тема: Amber (клик — light)" },
    }

    const meta = themeToIcon[theme] || themeToIcon.light
    themeIcon.className = meta.icon
    themeToggle.title = meta.title
  }

  // Добавляем анимацию появления элементов при загрузке
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Наблюдаем за секциями для анимации появления
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(section)
  })

  // Добавляем эффект печатания для заголовка
  const nameElement = document.querySelector(".name")
  const originalText = nameElement.textContent
  nameElement.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < originalText.length) {
      nameElement.textContent += originalText.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  setTimeout(typeWriter, 500)
})

// Добавляем CSS анимации
const style = document.createElement("style")
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .skill:hover {
    animation: pulse 0.3s ease-in-out;
  }
  
  .project-card:hover {
    animation: fadeInUp 0.3s ease-in-out;
  }
`
document.head.appendChild(style)
