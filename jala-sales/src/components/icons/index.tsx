import {
  ChevronLeft,
  ChevronRight,
  Command,
  Heart,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Search,
  ShoppingBag,
  type LucideProps,
} from "lucide-react";
import { Facebook } from "./facebook";
import { Google } from "./google";
import { Instagram } from "./instagram";
import { Twitter } from "./twitter";

export type IconProps = LucideProps;

export const Icons = {
  logo: Command,
  google: Google,
  loader: Loader2,
  search: Search,
  cart: ShoppingBag,
  favorite: Heart,
  mail: Mail,
  pin: MapPin,
  phone: Phone,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  chevRight: ChevronRight,
  chevLeft: ChevronLeft,
};
