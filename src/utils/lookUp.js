import { languageList } from "../data/lookup/languageList";

export function getLanguageById(id) {
    return languageList.find(language => language.id === id);
}