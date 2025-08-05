document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle")
  const body = document.body
  const themeIcon = themeToggle.querySelector("i")

  // Проверяем сохраненную тему
  const savedTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)

  // Обработчик клика на кнопку переключения темы
  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "light" ? "dark" : "light"

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
    if (theme === "dark") {
      themeIcon.className = "fas fa-sun"
      themeToggle.title = "Переключить на светлую тему"
    } else {
      themeIcon.className = "fas fa-moon"
      themeToggle.title = "Переключить на темную тему"
    }
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
