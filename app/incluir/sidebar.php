<style>
    /* From Uiverse.io by Smit-Prajapati */
    .button {
        background: none;
        border: none;
        cursor: pointer;
    }

    .button .bloom-container {
        position: relative;
        transition: all 0.2s ease-in-out;
        border: none;
        background: none;
    }

    .button .bloom-container .button-container-main {
        width: 110px;
        aspect-ratio: 1;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        display: grid;
        place-content: center;
        border-right: 5px solid white;
        border-left: 5px solid rgba(128, 128, 128, 0.147);
        /* transform: rotate(-45deg); */
        transition: all 0.5s ease-in-out;
    }

    .button .bloom-container .button-container-main .button-inner {
        height: 60px;
        aspect-ratio: 1;
        border-radius: 50%;
        position: relative;
        box-shadow: rgba(100, 100, 111, 0.5) -10px 5px 10px 0px;
        transition: all 0.5s ease-in-out;
    }

    .button .bloom-container .button-container-main .button-inner .back {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: linear-gradient(60deg,
                rgb(1, 85, 103) 0%,
                rgb(147, 245, 255) 100%);
    }

    .button .bloom-container .button-container-main .button-inner .front {
        position: absolute;
        inset: 5px;
        border-radius: 50%;
        background: linear-gradient(60deg,
                rgb(0, 103, 140) 0%,
                rgb(58, 209, 233) 100%);
        display: grid;
        place-content: center;
    }

    .button .bloom-container .button-container-main .button-inner .front .svg {
        fill: #ffffff;
        opacity: 0.5;
        width: 30px;
        aspect-ratio: 1;
        transform: rotate(45deg);
        transition: all 0.2s ease-in;
    }

    .button .bloom-container .button-container-main .button-glass {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.888) 100%);
        transform: translate(0%, -50%) rotate(0deg);
        transform-origin: bottom center;
        transition: all 0.5s ease-in-out;
    }

    .button .bloom-container .bloom {
        height: 1px;
        width: 1px;
        position: absolute;
        background: white;
    }

    .button .bloom-container .bloom1 {
        top: 10px;
        right: 20px;
        box-shadow:
            rgb(255, 255, 255) 0px 0px 10px 10px,
            rgb(255, 255, 255) 0px 0px 20px 20px;
    }

    .button .bloom-container .bloom2 {
        bottom: 10px;
        left: 20px;
        box-shadow:
            rgba(255, 255, 255, 0.5) 0px 0px 10px 10px,
            rgba(255, 255, 255, 0.5) 0px 0px 30px 20px;
    }

    .button .bloom-container:hover {
        transform: scale(1.1);
    }

    .button .bloom-container:hover .button-container-main .button-glass {
        transform: translate(0%, -40%);
    }

    .button .bloom-container:hover .button-container-main .button-inner .front .svg {
        opacity: 1;
        filter: drop-shadow(0 0 10px white);
    }

    .button .bloom-container:active {
        transform: scale(0.7);
    }

    .button .bloom-container:active .button-container-main .button-inner {
        transform: scale(1.2);
    }

   img{
    border-radius: 50%;
   }
</style>


<!-- From Uiverse.io by Smit-Prajapati -->
<button class="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdropCanvas" aria-controls="staticBackdrop">
    <div class="bloom-container">
        <div class="button-container-main">
            <div class="button-inner">
                <div class="back"></div>
                <div class="front">
                    <img width="80" src="../../public/img/logo.jpg" alt="">
                </div>
            </div>
            <div class="button-glass">
                <div class="back"></div>
                <div class="front"></div>
            </div>
        </div>
        <div class="bloom bloom1"></div>
        <div class="bloom bloom2"></div>
    </div>
</button>