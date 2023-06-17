import { computed, ref } from "vue";
import Categories from "~/constants/Categories";
import fakeAsset from "~/constants/fakeAsset";

type UseGallery = {
  categories: typeof Categories;
  displayedAssets: ComputedRef<Asset[]>;
  filters: Ref<string[]>;
};

const filters = ref([]);

export default function useGallery(): UseGallery {
  const assets = Array.from({ length: 10 }, () => fakeAsset);

  const displayedAssets = computed(() => {
    if (!filters.value.length) return assets;
    return assets.filter(({ traits }) =>
      filters.value.some((trait) => traits.includes(trait))
    );
  });

  return {
    categories: Categories,
    displayedAssets,
    filters,
  };
}
