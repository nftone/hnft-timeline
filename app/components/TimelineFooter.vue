<template>
  <div class="footer">
    <div>
      <div>
        The timeline is fully open source.
        <a href="https://github.com/nftone/hnft-timeline"
           target="_blank"
           class="website-link"
        >Follow these instructions</a>
        to add a new project or propose changes !
      </div>
    </div>
  </div>
  <div>
    <div class="footer">
        Created with ❤️ by the
        <a href="https://www.nft1.com/"
           target="_blank"
           class="website-link"
        >NFT1 Team.</a>
        <span id="donate-ether">Donate</span><span class="address">nft1dev.eth</span>
      <div class="footer-contact">
        <div>
          <a class="footer-contact-social-link"
             href=""
             target="_blank">
              <nuxt-img :src="`/images/icons/message.png`" width="30px"/>
          </a>
          <a class="footer-contact-social-link"
             href="https://github.com/nftone/hnft-timeline"
             target="_blank">
            <nuxt-img :src="`/images/icons/github.svg`" width="30px"/>
          </a>
          <a class="footer-contact-social-link"
             href=""
             target="_blank">
            <nuxt-img :src="`/images/icons/twitter.svg`" width="30px"/>
          </a>
          <a class="footer-contact-social-link"
             href=""
             target="_blank">
            <nuxt-img :src="`/images/icons/discord.svg`" width="30px"/>
          </a>
          <a class="footer-contact-social-link"
             href="https://www.nft1.com/"
             target="_blank">
            <nuxt-img :src="`/images/icons/web.svg`" width="30px"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

</script>


<style>
.footer {
  text-align: center;
  background-color: #353535;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  border-top: 2px solid var(--dark);
}

.website-link {
  cursor: pointer;
  transition: 0.2s ease-out;
  padding-left: 2px;
}

.website-link:hover {
  color: var(--grey);
}

#donate-ether {
  padding: 0.3rem;
  background-color: #353535;
  text-transform: uppercase;
  border: 1px solid #fff;
  border-radius: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  transition: 0.3s;
  margin-left: 1rem;
  cursor: pointer;
}

#donate-ether:hover {
  background-color: var(--dark);
  color: #fff;
}

.address {
  padding: 0.3rem;
  background-color: var(--grey);
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: 0.3s;
}


.footer-contact {
  display: flex;
  justify-content: center;
  padding-top: 10px;

}

.footer-contact-label {
  font-size: 11px;
  width: 40%;
  text-align: center;
  color: #fff;
  padding-right: 5px;
}

.footer-contact-social-link {
  margin: 5px;
  color: #fff;
  transition: 0.2s;
}

.footer-contact-social-link:hover {
  color: #656565;
  cursor: pointer;
}
</style>

