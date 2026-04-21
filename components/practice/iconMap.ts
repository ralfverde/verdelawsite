import {
  Shield,
  Home,
  Scale,
  Users,
  Heart,
  Award,
  FileText,
  Briefcase,
  Gavel,
  PenLine,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Service } from "@/data/services";

export const iconMap: Record<Service["icon"] | "ShieldCheck", LucideIcon> = {
  Shield,
  Home,
  Scale,
  Users,
  Heart,
  Award,
  FileText,
  Briefcase,
  Gavel,
  PenLine,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
};
