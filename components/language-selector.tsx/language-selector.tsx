"use client";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { usePathname, useRouter } from "next-intl/client";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";

export default function LanguageSelector() {
  const locale = useLocale();
  const [lang, setLang] = React.useState("es");
  const pathname = usePathname();
  const t = useTranslations("General");

  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    router.replace(pathname, { locale: event.target.value });
  };

  useEffect(() => {
    setLang(locale);
  }, [locale]);

  return (
    <FormControl
      data-testid="language-selector"
      sx={{ m: 1, minWidth: 120 }}
      size="small"
    >
      <InputLabel id="select-language-label">{t("language")}</InputLabel>
      <Select
        labelId="select-language-label"
        value={lang}
        label="Idioma"
        onChange={handleChange}
      >
        <MenuItem value="es">{t("es")}</MenuItem>
        <MenuItem value="en">{t("en")}</MenuItem>
      </Select>
    </FormControl>
  );
}
