document.addEventListener("DOMContentLoaded", () => {
  AOS.init();


  const nav = document.querySelector(".header .nav");
  const openNavBtn = document.querySelector(".menu__btn");
  const closeNav = document.querySelector(".close__nav");
  const navLinks = document.querySelectorAll(".close-menu__link")
  openNavBtn.addEventListener("click", () => {
    nav.classList.toggle('show');
    document.body.classList.toggle('no-scroll')
  })
  closeNav.addEventListener("click", () => {
    nav.classList.remove('show');
    document.body.classList.remove('no-scroll');
  })
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove('show');
      document.body.classList.remove('no-scroll');
    })
  })


  const futureListingSwiper = new Swiper('.future__listing-swiper', {
    spaceBetween: 15,
    slidesPerView: 6,
    centeredSlides: true,
    loop: true,
    speed: 700,
    grabCursor: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1024: {
        spaceBetween: 15,
        slidesPerView: 6,
      },
      600: {
        spaceBetween: 9,
        slidesPerView: 4,
      },
      0: {
        spaceBetween: 5,
        slidesPerView: 2.7,
      }
    }
  });


  const referralLevelsSwiper = new Swiper('.referral__levels-swiper', {
    spaceBetween: 0,
    slidesPerView: 4,
    speed: 700,
    grabCursor: true,
    breakpoints: {
      1500: {
        slidesPerView: 4,
      },
      600: {
        spaceBetween: 2,
        slidesPerView: 4,
      },
      0: {
        spaceBetween: 1,
      }
    }
  });

  const leaderboardsTableBannerSwiper2 = new Swiper('.leaderboards__table-banner-swiper-2', {
    spaceBetween: 21,
    slidesPerView: 2,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    grabCursor: true,
    loop: true,
    speed: 700,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    breakpoints: {
      768: {
        spaceBetween: 21,
        slidesPerView: 2,
      },
      0: {
        spaceBetween: 5,
        slidesPerView: 1.4,
      },
    }
  });


  const aboutSlider = new Swiper('.about__slider', {
    spaceBetween: 39,
    slidesPerView: 2.8,
    speed: 700,
    grabCursor: true,
    navigation: {
      nextEl: ".next-btn",
      prevEl: ".prev-btn",
    },
    breakpoints: {
      1350: {
        spaceBetween: 39,
        slidesPerView: 2.8,
      },
      1100: {
        spaceBetween: 30,
        slidesPerView: 2.6,
      },
      992: {
        spaceBetween: 25,
        slidesPerView: 2,
      },
      600: {
        spaceBetween: 25,
        slidesPerView: 1.6,
      },
      0: {
        spaceBetween: 25,
        slidesPerView: 1.2,
        initialSlide: 0,

      }
    }
  });

  const stepContent = document.querySelectorAll(".step-content");
  const nextStepBtn = document.querySelector(".next__step-btn");
  const prevStepBtn = document.querySelector(".prev__step-btn");
  const stepTitles = document.querySelectorAll(".step__title");
  const line = document.querySelector(".line");
  const numberImages = document.querySelectorAll(".number__img");
  const stepLine = document.querySelector(".step__line");

  let stepCount = 1;


  function getStepWidth() {
    return stepLine ? stepLine.offsetWidth / 3 : 637 / 3;
  }

  function updateSteps() {
    const stepWidth = getStepWidth();

    stepTitles.forEach((title, index) => {
      if (index + 1 < stepCount) {
        title.classList.add("show");
        title.classList.remove("active");
      } else if (index + 1 === stepCount) {
        title.classList.add("active", "show");
      } else {
        title.classList.remove("active", "show");
      }
    });

    stepContent.forEach(content => {
      content.classList.remove("show");
      const id = +content.getAttribute("id");
      if (stepCount === id) {
        content.classList.add("show");
      }
    });

    line.style.width = `${(stepCount - 1) * stepWidth}px`;

    numberImages.forEach((img, index) => {
      let baseSrc = img.getAttribute("src").split("/").slice(0, -1).join("/");
      if (index + 1 === stepCount) {
        img.src = `${baseSrc}/${index + 1}.1.webp`;
      } else {
        img.src = `${baseSrc}/${index + 1}.webp`;
      }
    });

    prevStepBtn.classList.toggle("disabled", stepCount === 1);
    nextStepBtn.classList.toggle("disabled", stepCount === stepContent.length);
  }


  const phaseBtn = document.querySelectorAll(".phase-btn");
  phaseBtn.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      stepCount = index + 1;
      updateSteps();

      const roadmapSection = document.querySelector("#roadmap");
      if (roadmapSection) {
        roadmapSection.scrollIntoView({ behavior: "smooth" });
      }


      const nav = document.querySelector(".header .nav");
      nav.classList.remove('show');
      document.body.classList.remove('no-scroll');
    });
  });


  stepTitles.forEach(title => {
    title.addEventListener('click', () => {
      stepCount = +title.textContent.split(" ")[1];
      updateSteps();
    });
  });


  nextStepBtn.addEventListener("click", () => {
    if (stepCount < stepContent.length) {
      stepCount++;
      updateSteps();
    }
  });

  prevStepBtn.addEventListener("click", () => {
    if (stepCount > 1) {
      stepCount--;
      updateSteps();
    }
  });


  updateSteps();



  const accordions = document.querySelectorAll(".accordion");
  if (accordions) {
    if (accordions.length > 0) {
      accordions[0].classList.add("show");
    }
    accordions.forEach((accordion) => {
      const accordionHeader = accordion.querySelector(".accordion__header");
      accordionHeader.addEventListener("click", () => {
        accordions.forEach((acc) => {
          if (acc !== accordion) {
            acc.classList.remove("show");
          }
        });
        accordion.classList.toggle("show");
      });
    });
  }


  //tab

  const tabBtn = document.querySelectorAll(".leaderboards__table-header-box");
  if (tabBtn) {
    const tabContent = document.querySelectorAll(".leaderboards__table");

    tabBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {

        tabBtn.forEach(button => button.classList.remove("active"));

        btn.classList.add("active");


        tabContent.forEach(content => content.style.display = "none");


        tabContent[index].style.display = "block";
      });
    });
  }

  const openModalBtns = document.querySelectorAll(".modal-btn");
  const closeModalBtns = document.querySelectorAll(".close__modal");
  const allModals = document.querySelectorAll(".modal");

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal-target");
      const targetModal = document.querySelector(modalId);


      allModals.forEach((modal) => modal.classList.remove("show"));


      targetModal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      modal.classList.remove("show");
      document.body.style.overflow = "";
    });
  });

  window.addEventListener("click", (e) => {
    const modal = e.target.closest(".modal");
    if (modal && !modal.querySelector(".modal__content").contains(e.target)) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });


  const dropdownParents = document.querySelectorAll(".dropdown__box");

  dropdownParents.forEach(item => {
    const dropdown = item.querySelector(".dropdown");

    item.addEventListener("click", (e) => {
      e.stopPropagation();


      dropdownParents.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".dropdown").classList.remove("active");
        }
      });


      dropdown.classList.toggle("active");
      item.classList.toggle("active");
    });
  });

  document.addEventListener("click", () => {
    dropdownParents.forEach(item => {
      item.classList.remove("active");
      item.querySelector(".dropdown").classList.remove("active");
    });
  });




  const bonusProsentElements = document.querySelectorAll('.bonus__prosent');


  bonusProsentElements.forEach(element => {
    element.addEventListener('click', function () {

      bonusProsentElements.forEach(item => item.classList.remove('active'));


      this.classList.add('active');
    });
  });


  const text1 = "TO BUILD A SOLID\nFOUNDATION FOR THE\nFUTURE!";
  const container1 = document.querySelector(".moo__soldier-content");
  let index1 = 0;

  if (container1) {

    function type1() {
      if (index1 < text1.length) {
        if (text1[index1] === "\n") {
          container1.innerHTML += "<br>";
        } else {
          container1.innerHTML = container1.innerHTML.replace(/\|$/, "");
          container1.innerHTML += text1[index1];
        }
        index1++;
        setTimeout(type1, 100);
      }
    }


    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {

            type1();
            observer.unobserve(container1);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );


    observer.observe(container1);
  }

  const tokenomics__banner = document.querySelector(".tokenomics__banner-info");

  if (tokenomics__banner) {
    const spanText = "NO DOGS, NO FROGS";
    const restText = " — JUST ONE POWERFUL BULL.";
    const fullText = spanText + restText;
    let index = 0;


    const spanElement = document.createElement("span");
    tokenomics__banner.innerHTML = "";
    tokenomics__banner.appendChild(spanElement);


    function type() {
      if (index < fullText.length) {

        if (index < spanText.length) {
          spanElement.innerHTML = spanElement.innerHTML.replace(/\|$/, "");
          spanElement.innerHTML += fullText[index];
        }

        else {
          tokenomics__banner.innerHTML = tokenomics__banner.innerHTML.replace(/\|$/, "");
          tokenomics__banner.innerHTML += fullText[index];
        }
        index++;
        setTimeout(type, 100);
      }
    }


    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {

            type();
            observer.unobserve(tokenomics__banner);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );


    observer.observe(tokenomics__banner);
  }



  const copyBtn = document.querySelector(".copy__btn");

  copyBtn.addEventListener("click", () => {
    copyToClipboard();
    copyBtn.style.backgroundColor = "#006400";
    copyBtn.style.color = "#ffffff";


    setTimeout(() => {
      copyBtn.style.backgroundColor = "";
      copyBtn.style.color = "";
    }, 2000);
  });

  function copyToClipboard() {
    const copyText = document.getElementById("contractAddress").innerText;
    navigator.clipboard.writeText(copyText).catch(err => {
      console.error("Failed to copy: ", err);
    });
  }


  const mooContent = document.querySelector(".moo__content");

  if (mooContent) {
    const spanText = "NEXT BIG COIN"; //
    const fullText = "THE SEARCH FOR THE NEXT BIG COIN ENDS HERE!";
    let index = 0;


    const spanElement = document.createElement("span");
    mooContent.innerHTML = "";


    function type() {
      if (index < fullText.length) {
        if (index < "THE SEARCH FOR THE ".length) {
          mooContent.innerHTML = mooContent.innerHTML.replace(/\|$/, "");
          mooContent.innerHTML += fullText[index];
        }
        else if (index < "THE SEARCH FOR THE ".length + spanText.length) {
          if (index === "THE SEARCH FOR THE ".length) {
            mooContent.appendChild(spanElement);
          }
          spanElement.innerHTML = spanElement.innerHTML.replace(/\|$/, "");
          spanElement.innerHTML += fullText[index];
        }
        else {
          mooContent.innerHTML = mooContent.innerHTML.replace(/\|$/, "");
          mooContent.innerHTML += fullText[index];
        }
        index++;
        setTimeout(type, 100);
      }
    }


    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            type();
            observer.unobserve(mooContent);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(mooContent);
  }


  const languageBoxes = document.querySelectorAll('.header__language-box');

  languageBoxes.forEach(box => {
    box.addEventListener('click', () => {
      languageBoxes.forEach(item => item.classList.remove('active'));
      box.classList.add('active');
    });
  });

  document.querySelectorAll('.look-btn').forEach(item => item.addEventListener('click', function (event) {
    if (!this.classList.contains('vibrate')) {
      this.classList.add('vibrate');
      setTimeout(() => {
        this.classList.remove('vibrate');
      }, 1000);
    }
  }))
  const prevStepBtn2 = document.querySelector(".prev__step-btn");
  const nextStepBtn2 = document.querySelector(".next__step-btn");
  const roadmapSection = document.querySelector("#roadmap");
  function scrollToRoadmap() {
    if (window.innerWidth <= 768) {
      roadmapSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  prevStepBtn2.addEventListener("click", scrollToRoadmap);
  nextStepBtn2.addEventListener("click", scrollToRoadmap);

  const audioControlButtons = document.querySelectorAll(".social__media-box");

  audioControlButtons.forEach(button => {
    button.addEventListener("click", () => {
      const audioId = button.getAttribute("data-audio");
      const audioPlayer = document.getElementById(audioId);
      const speakerIcon = button.querySelector(".speakerIcon");


      audioPlayer.loop = true;

      if (audioPlayer.paused) {

        audioPlayer.play();


        speakerIcon.src = "images/icons/pause.svg";
      } else {

        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        speakerIcon.src = "images/icons/speaker.svg";
      }
    });
  });


  const coinsBoxesContainer = document.querySelectorAll('.coins__boxes');
  coinsBoxesContainer.forEach(item => {
    const coinBoxes = item.querySelectorAll('.coins__box');
    console.log(coinBoxes);

    coinBoxes.forEach((box) => {
      box.addEventListener('click', () => {

        coinBoxes.forEach((b) => b.classList.remove('active'));


        box.classList.add('active');
      });
    });
  })

});

document.addEventListener("DOMContentLoaded", () => {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animateSwiper1();
    animateSwiper2();
  }
});

function animateSwiper1() {
  const scrollers = document.querySelectorAll(".leaderboards__table-banner-swiper-1");

  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", "true");

    const scrollerInner = scroller.querySelector(".scroller__inner");
    if (!scrollerInner) return;

    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      scrollerInner.appendChild(clone);
    });
  });
}

function animateSwiper2() {
  const scrollers = document.querySelectorAll(".leaderboards__table-banner-swiper-2");

  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", "true");

    const scrollerInner = scroller.querySelector(".scroller__inner");
    if (!scrollerInner) return;

    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      scrollerInner.appendChild(clone);
    });
  });
}



document.querySelectorAll('.copy__btn-modal').forEach((btn) => {
  btn.addEventListener('click', function () {
    const textToCopy = this.closest('.copy__box').querySelector('span').innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
      this.classList.add('copied');
      this.innerText = 'Copied!';


      setTimeout(() => {
        this.classList.remove('copied');
        this.innerText = 'Copy';
      }, 2000);
    });
  });
});


document.querySelector('.leaderboard-link').addEventListener('click', function (e) {
  e.preventDefault();

  document.querySelectorAll('.leaderboards__table-header-box').forEach(tab => {
    tab.classList.remove('active');
  });

  document.querySelectorAll('.leaderboards__table_active').forEach(content => {
    content.classList.remove('active');
  });

  document.querySelectorAll('.leaderboards__table').forEach(table => {
    table.classList.remove('active');
  });

  document.querySelector('button[data-tab="referral-leaders"]').classList.add('active');

  document.querySelector('#referral-leaders').classList.add('active');

  document.querySelector('#referral-leaders').scrollIntoView({ behavior: 'smooth' });
});


document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".select__btn");
  const tabContents = document.querySelectorAll(".modal__tab-content");

  tabButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {

      tabButtons.forEach(button => button.classList.remove("active"));


      btn.classList.add("active");


      tabContents.forEach(content => content.classList.remove("active"));


      if (tabContents[index]) {
        tabContents[index].classList.add("active");
      }
    });
  });
});




const coins = document.querySelectorAll('.coins__box');
const modal = document.getElementById('modal1');
const selectBtn = document.querySelector('.select__payment-btn');
const selectedCoinBox = document.getElementById('selected-coin');


coins.forEach(coin => {
  coin.addEventListener('click', () => {
    const imgOneSrc = coin.querySelector('.img__one').getAttribute('src');
    const imgTwoSrc = coin.querySelector('.img__two').getAttribute('src');
    const title = coin.querySelector('h3').textContent;
    const subtitle = coin.querySelector('h4').textContent;

    selectedCoinBox.innerHTML = `
      <div class="img__box">
        <img class="img__one" src="${imgOneSrc}" alt="">
        <img class="img__two" src="${imgTwoSrc}" alt="">
      </div>
      <h3>${title}</h3>
    `;

    modal.classList.remove("show");
    document.body.style.overflow = ""
  });
});


const fireMoo = document.querySelector(".fire__moo");
const priceProgress = document.querySelector(".price__progress");
const fireImg = document.querySelector(".fire__img");
const timeBoxes = document.querySelectorAll(".intro__right-time-box");

function startCountdown(targetDate) {
  const daysEl = document.querySelectorAll(".intro__right-time-box h3")[0];
  const hoursEl = document.querySelectorAll(".intro__right-time-box h3")[1];
  const minsEl = document.querySelectorAll(".intro__right-time-box h3")[2];
  const secsEl = document.querySelectorAll(".intro__right-time-box h3")[3];

  function updateTimer() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minsEl.textContent = minutes.toString().padStart(2, "0");
    secsEl.textContent = seconds.toString().padStart(2, "0");

    if (timeLeft <= 60 * 60 * 1000) {
      fireMoo.classList.add("end__time");
      priceProgress.classList.add("end__time");
      fireImg.classList.add("end__time");
      timeBoxes.forEach(timeBox => {
        timeBox.classList.add("end__time");
      });
    }
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

function getNext3DayCycleTarget() {
  const baseDate = new Date("2024-01-01T00:00:00")
  const now = new Date();
  const msIn3Days = 3 * 24 * 60 * 60 * 1000;
  const timePassed = now - baseDate;

  const cyclesPassed = Math.floor(timePassed / msIn3Days);
  const nextTarget = new Date(baseDate.getTime() + (cyclesPassed + 1) * msIn3Days);

  return nextTarget;
}


// const targetDate = getNext3DayCycleTarget();
// startCountdown(targetDate);
// Set countdown to 59 minutes from now
const countdownDate = new Date(new Date().getTime() + 59 * 60 * 1000); // 59 minutes from now
startCountdown(countdownDate);
