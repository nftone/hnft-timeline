import { ref } from "vue";

export const pageSections = {
  home: "home",
  "the-artist": "the-artist",
  team: "team",
};

export default function useScrollPosition() {
  const currentSection = ref(pageSections.home);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const theArtist = document.getElementById(pageSections["the-artist"]);
    const team = document.getElementById(pageSections.team);
    const theArtistPosition = theArtist?.offsetTop || 0;
    const teamPosition = team?.offsetTop || 0;
    console.log(
      "🚀 ~ file: useScrollPosition.ts:18 ~ handleScroll ~ teamPosition:",
      theArtistPosition
    );

    console.log(
      "🚀 ~ file: useScrollPosition.ts:20 ~ handleScroll ~ scrollPosition:",
      scrollPosition
    );
    if (scrollPosition + 120 < theArtistPosition) {
      currentSection.value = pageSections.home;
    } else if (scrollPosition + 20 < teamPosition) {
      currentSection.value = pageSections["the-artist"];
    } else {
      currentSection.value = pageSections.team;
    }
  };

  window.addEventListener("scroll", handleScroll);

  return {
    currentSection,
  };
}
