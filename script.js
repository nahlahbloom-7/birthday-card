/* =========================================
   ELEMENTS
========================================= */

const openBook =
    document.getElementById("openBook");

const desk =
    document.getElementById("desk");

const bookmark =
    document.getElementById("bookmark");

const waxSeal =
    document.getElementById("waxSeal");

const polaroid =
    document.getElementById("polaroid");

const psNote =
    document.getElementById("psNote");

const openNote =
    document.getElementById("openNote");

const hiddenWord =
    document.getElementById("hiddenWord");

const bookButtons =
    document.querySelectorAll(".mini-book");

const bookMessage =
    document.getElementById("bookMessage");

const bookMessageText =
    document.getElementById("bookMessageText");

const closeMessage =
    document.getElementById("closeMessage");

const lastPage =
    document.getElementById("lastPage");

const secretSection =
    document.getElementById("secretSection");

const finalSection =
    document.getElementById("finalSection");


/* =========================================
   OPEN THE CARD
========================================= */

openBook.addEventListener("click", () => {

    desk.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================================
   BOOKMARK
========================================= */

bookmark.addEventListener("click", () => {

    secretSection.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================================
   WAX SEAL
========================================= */

waxSeal.addEventListener("click", () => {

    secretSection.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================================
   POLAROID FLIP
========================================= */

polaroid.addEventListener("click", () => {

    polaroid.classList.toggle("flipped");

});


/* =========================================
   P.S. NOTE
========================================= */

openNote.addEventListener("click", (event) => {

    event.stopPropagation();

    psNote.classList.toggle("open");

});


/* =========================================
   HIDDEN WORD
========================================= */

hiddenWord.addEventListener("click", () => {

    const message =
        document.createElement("div");

    message.className =
        "hidden-message";

    message.innerHTML = `
        <div class="hidden-message-inner">
            <button class="hidden-close">×</button>

            <p>
                لأن بعض الأشياء الجميلة
                لا تحتاج أن تكون واضحة
                من البداية.
            </p>
        </div>
    `;

    document.body.appendChild(message);


    requestAnimationFrame(() => {

        message.classList.add("active");

    });


    message
        .querySelector(".hidden-close")
        .addEventListener("click", () => {

            message.classList.remove("active");

            setTimeout(() => {

                message.remove();

            }, 400);

        });

});


/* =========================================
   BOOK SELECTION
========================================= */

const messages = {

    mind: `
        لأن ذكاءكِ ليس في كمية ما تعرفينه،
        بل في الطريقة التي تنظرين بها إلى الأشياء.
    `,

    conversation: `
        ومن أجمل الأشياء فيكِ،
        أن الحديث معكِ لا ينتهي عند الكلام.
        دائمًا هناك فكرة أخرى،
        وسؤال آخر،
        وصفحة جديدة تستحق أن تُفتح.
    `,

    chapter: `
        وربما أجمل ما في السنوات الجديدة
        أنها لم تُكتب بعد.
        أتمنى أن تكتبي فصلًا يشبهكِ تمامًا؛
        عميقًا، جميلًا، ومليئًا بما يستحق أن يُعاش.
    `

};


bookButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedBook =
            button.dataset.book;

        bookMessageText.textContent =
            messages[selectedBook];

        bookMessage.classList.add("show");

        bookMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


/* =========================================
   CLOSE BOOK MESSAGE
========================================= */

closeMessage.addEventListener("click", () => {

    bookMessage.classList.remove("show");

});


/* =========================================
   LAST PAGE
========================================= */

lastPage.addEventListener("click", () => {

    finalSection.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================================
   COVER PARALLAX
========================================= */

const cover =
    document.getElementById("cover");

const coverContent =
    document.querySelector(".cover-content");

const floatingPapers =
    document.querySelectorAll(".floating-paper");


cover.addEventListener("mousemove", (event) => {

    const x =
        (event.clientX / window.innerWidth) - 0.5;

    const y =
        (event.clientY / window.innerHeight) - 0.5;


    coverContent.style.transform =
        `
        translate(
            ${x * 12}px,
            ${y * 12}px
        )
        `;


    floatingPapers.forEach((paper, index) => {

        const strength =
            index === 0 ? 18 : -14;

        paper.style.transform =
            `
            translate(
                ${x * strength}px,
                ${y * strength}px
            )
            rotate(${index === 0 ? -8 : 7}deg)
            `;

    });

});


cover.addEventListener("mouseleave", () => {

    coverContent.style.transform =
        "translate(0, 0)";

    floatingPapers[0].style.transform =
        "rotate(-8deg)";

    floatingPapers[1].style.transform =
        "rotate(7deg)";

});


/* =========================================
   REVEAL ON SCROLL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".desk-heading, .desk, .book-selection, .secret-content, .final-content"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    observer.observe(element);

});
