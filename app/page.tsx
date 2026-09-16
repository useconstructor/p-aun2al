"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Heart,
  User,
  Star,
  ArrowRight,
  ChevronRight,
  Gem,
  Shield,
  Truck,
  Award,
  Quote,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Eye,
  Plus,
  Sparkles,
  Crown,
  Circle,
  Hexagon
} from "lucide-react"

const colors = {
  cream: "#F9F7F4",
  sage: "#EEF1EC",
  gold: "#D4AF37",
  charcoal: "#3D3D3D",
  stone: "#817D75"
}

const navLinks = [
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#collections" },
  { label: "Artisans", href: "#about" },
  { label: "Our Story", href: "#story" },
  { label: "Become a Seller", href: "/seller" }
]

const categories = [
  { id: "all", label: "All Pieces" },
  { id: "rings", label: "Rings" },
  { id: "necklaces", label: "Necklaces" },
  { id: "earrings", label: "Earrings" },
  { id: "bracelets", label: "Bracelets" }
]

const products = [
  {
    id: 1,
    name: "Moonstone Crescent Ring",
    description: "Hand carved sterling silver band featuring an ethically sourced moonstone cabochon with natural blue flash",
    price: "From $185",
    category: "rings",
    maker: "Elena Crafts",
    rating: 4.9,
    reviews: 47,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Hammered Gold Hoops",
    description: "14k gold filled hoops with artisan hammer texture, lightweight everyday elegance",
    price: "From $125",
    category: "earrings",
    maker: "Studio Sage",
    rating: 4.8,
    reviews: 32,
    badge: null
  },
  {
    id: 3,
    name: "Pearl Strand Necklace",
    description: "Freshwater pearls hand knotted on silk thread with 18k gold vermeil clasp",
    price: "From $245",
    category: "necklaces",
    maker: "Pearl & Stone",
    rating: 5.0,
    reviews: 28,
    badge: "New"
  },
  {
    id: 4,
    name: "Botanical Cuff Bracelet",
    description: "Oxidized silver cuff with pressed wildflower motifs, adjustable fit",
    price: "From $165",
    category: "bracelets",
    maker: "Wild Forge",
    rating: 4.7,
    reviews: 19,
    badge: null
  },
  {
    id: 5,
    name: "Sapphire Cluster Studs",
    description: "Three stone cluster featuring ethically sourced Montana sapphires in 14k gold",
    price: "From $320",
    category: "earrings",
    maker: "Azure Atelier",
    rating: 4.9,
    reviews: 41,
    badge: "Limited"
  },
  {
    id: 6,
    name: "Signet Ring with Engraving",
    description: "Classic oval signet in recycled sterling silver, custom hand engraving available",
    price: "From $195",
    category: "rings",
    maker: "Heritage Hands",
    rating: 4.8,
    reviews: 56,
    badge: null
  },
  {
    id: 7,
    name: "Layered Chain Necklace Set",
    description: "Three delicate chains in varying lengths, mix of gold fill and sterling silver",
    price: "From $175",
    category: "necklaces",
    maker: "Minimal Studio",
    rating: 4.6,
    reviews: 23,
    badge: null
  },
  {
    id: 8,
    name: "Woven Wire Bangle",
    description: "Intricate wire weaving technique in oxidized brass with gold accents",
    price: "From $145",
    category: "bracelets",
    maker: "Wirework Co",
    rating: 4.9,
    reviews: 37,
    badge: "Artisan Pick"
  }
]

const collections = [
  {
    id: 1,
    name: "Minimalist Elegance",
    description: "Clean lines and understated beauty for everyday wear",
    count: 48,
    icon: Circle
  },
  {
    id: 2,
    name: "Vintage Revival",
    description: "Heirloom inspired pieces with timeless appeal",
    count: 36,
    icon: Crown
  },
  {
    id: 3,
    name: "Statement Pieces",
    description: "Bold designs that command attention",
    count: 24,
    icon: Hexagon
  },
  {
    id: 4,
    name: "Bridal & Engagement",
    description: "Celebrate love with one of a kind creations",
    count: 52,
    icon: Sparkles
  }
]

const testimonials = [
  {
    id: 1,
    quote: "The quality and craftsmanship exceeded my expectations. Knowing the story behind my ring makes it even more special.",
    author: "Verified Buyer",
    location: "New York",
    rating: 5,
    product: "Moonstone Crescent Ring"
  },
  {
    id: 2,
    quote: "Finally, a platform that values artisans as much as customers. The custom engraving on my bracelet was perfect.",
    author: "Verified Buyer",
    location: "Los Angeles",
    rating: 5,
    product: "Botanical Cuff Bracelet"
  },
  {
    id: 3,
    quote: "I love being able to connect directly with the maker. The authenticity certificate gives me complete peace of mind.",
    author: "Verified Buyer",
    location: "Chicago",
    rating: 5,
    product: "Pearl Strand Necklace"
  }
]

const stats = [
  { value: "500+", label: "Verified Artisans" },
  { value: "15k+", label: "Unique Pieces" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "25", label: "Countries Shipped" }
]

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.category === activeCategory)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CONSTRUCTOR_API}/v1/forms/${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, formType: "newsletter" })
        }
      )

      if (response.ok) {
        setSubmitSuccess(true)
        setEmail("")
      } else {
        throw new Error("Submission failed")
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: colors.cream }}>
      {/* Sticky Navigation */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: colors.cream,
          borderColor: `${colors.stone}20`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Gem className="w-8 h-8" style={{ color: colors.gold }} />
              <span
                className="text-2xl tracking-wide"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: colors.charcoal
                }}
              >
                Artisan Collective
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm tracking-wide transition-colors hover:opacity-70"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: colors.charcoal
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                className="p-2 transition-colors hover:opacity-70"
                style={{ color: colors.charcoal }}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/account"
                className="p-2 transition-colors hover:opacity-70"
                style={{ color: colors.charcoal }}
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
              <Link
                href="/wishlist"
                className="p-2 transition-colors hover:opacity-70"
                style={{ color: colors.charcoal }}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
              <Link
                href="/cart"
                className="p-2 transition-colors hover:opacity-70 relative"
                style={{ color: colors.charcoal }}
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: colors.gold }}
                >
                  0
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle menu"
              style={{ color: colors.charcoal }}
            >
              {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileNavOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ backgroundColor: colors.cream }}
        >
          <div className="px-4 py-6 space-y-4 border-t" style={{ borderColor: `${colors.stone}20` }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-2 text-lg"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: colors.charcoal
                }}
                onClick={() => setMobileNavOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: `${colors.stone}20` }}>
              <Link href="/account" className="p-2" style={{ color: colors.charcoal }}>
                <User className="w-5 h-5" />
              </Link>
              <Link href="/wishlist" className="p-2" style={{ color: colors.charcoal }}>
                <Heart className="w-5 h-5" />
              </Link>
              <Link href="/cart" className="p-2" style={{ color: colors.charcoal }}>
                <ShoppingBag className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Split */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 min-h-[85vh]">
          {/* Left Content */}
          <div
            className="flex flex-col justify-center px-8 py-16 lg:px-16 xl:px-24"
            style={{ backgroundColor: colors.cream }}
          >
            <Badge
              className="w-fit mb-6 text-xs tracking-widest uppercase"
              style={{
                backgroundColor: colors.sage,
                color: colors.charcoal,
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Handcrafted with intention
            </Badge>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: colors.charcoal
              }}
            >
              Jewelry with
              <br />
              <span style={{ color: colors.gold }}>a story</span>
            </h1>
            <p
              className="text-lg lg:text-xl mb-8 max-w-md leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: colors.stone
              }}
            >
              Discover one of a kind pieces from verified independent artisans.
              Every creation tells a story of craftsmanship, heritage, and authentic beauty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="px-8 py-6 text-sm tracking-widest uppercase"
                style={{
                  backgroundColor: colors.charcoal,
                  color: colors.cream,
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                <Link href="#products">
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 py-6 text-sm tracking-widest uppercase"
                style={{
                  borderColor: colors.charcoal,
                  color: colors.charcoal,
                  fontFamily: "'Inter', sans-serif",
                  backgroundColor: "transparent"
                }}
              >
                <Link href="/seller">Become a Seller</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div
              className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t"
              style={{ borderColor: `${colors.stone}30` }}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: colors.gold }} />
                <span
                  className="text-sm"
                  style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
                >
                  Authenticity Certified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5" style={{ color: colors.gold }} />
                <span
                  className="text-sm"
                  style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
                >
                  Worldwide Shipping
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div
            className="relative min-h-[400px] lg:min-h-full"
            style={{
              background: `linear-gradient(135deg, ${colors.sage} 0%, ${colors.cream} 50%, ${colors.sage} 100%)`
            }}
          >
            {/* Decorative Elements */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: 0.1 }}
            >
              <Gem className="w-64 h-64" style={{ color: colors.gold }} />
            </div>
            <div
              className="absolute bottom-8 left-8 right-8 p-6 rounded-lg"
              style={{ backgroundColor: `${colors.cream}95` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.sage }}
                >
                  <Award className="w-6 h-6" style={{ color: colors.gold }} />
                </div>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ fontFamily: "'Inter', sans-serif", color: colors.charcoal }}
                  >
                    Featured Artisan
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
                  >
                    Each piece comes with maker provenance and care instructions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section id="collections" className="py-20 lg:py-32" style={{ backgroundColor: colors.sage }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p
              className="text-sm tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Inter', sans-serif", color: colors.gold }}
            >
              Curated Collections
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
            >
              Discover Your Style
            </h2>
            <div
              className="w-16 h-px mx-auto"
              style={{ backgroundColor: colors.gold }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => {
              const IconComponent = collection.icon
              return (
                <Link key={collection.id} href={`/collections/${collection.id}`}>
                  <Card
                    className="group p-8 text-center transition-all duration-300 hover:shadow-lg border-0 cursor-pointer h-full"
                    style={{ backgroundColor: colors.cream }}
                  >
                    <div
                      className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-110"
                      style={{ backgroundColor: colors.sage }}
                    >
                      <IconComponent className="w-8 h-8" style={{ color: colors.gold }} />
                    </div>
                    <h3
                      className="text-xl mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
                    >
                      {collection.name}
                    </h3>
                    <p
                      className="text-sm mb-4 leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
                    >
                      {collection.description}
                    </p>
                    <p
                      className="text-xs tracking-wider uppercase"
                      style={{ fontFamily: "'Inter', sans-serif", color: colors.gold }}
                    >
                      {collection.count} pieces
                    </p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Products Grid with Category Tabs */}
      <section id="products" className="py-20 lg:py-32" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className="text-sm tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Inter', sans-serif", color: colors.gold }}
            >
              Shop the Collection
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
            >
              Artisan Favorites
            </h2>
            <div
              className="w-16 h-px mx-auto mb-8"
              style={{ backgroundColor: colors.gold }}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 text-sm tracking-wider uppercase transition-all duration-300 border ${
                  activeCategory === category.id
                    ? "border-transparent"
                    : "border-transparent hover:border-current"
                }`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  backgroundColor: activeCategory === category.id ? colors.charcoal : "transparent",
                  color: activeCategory === category.id ? colors.cream : colors.charcoal
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <div
                  className="relative aspect-square mb-4 overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, ${colors.sage} 0%, ${colors.cream} 100%)`
                  }}
                >
                  {/* Product Badge */}
                  {product.badge && (
                    <Badge
                      className="absolute top-4 left-4 z-10 text-xs tracking-wider"
                      style={{
                        backgroundColor: colors.gold,
                        color: colors.cream,
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      {product.badge}
                    </Badge>
                  )}

                  {/* Placeholder Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Gem className="w-20 h-20" style={{ color: colors.gold }} />
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={`/products/${product.id}`}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                      style={{ backgroundColor: colors.cream, color: colors.charcoal }}
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                      style={{ backgroundColor: colors.cream, color: colors.charcoal }}
                      aria-label="Add to wishlist"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                      style={{ backgroundColor: colors.charcoal, color: colors.cream }}
                      aria-label="Add to bag"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <p
                    className="text-xs tracking-wider uppercase"
                    style={{ fontFamily: "'Inter', sans-serif", color: colors.gold }}
                  >
                    {product.maker}
                  </p>
                  <Link href={`/products/${product.id}`}>
                    <h3
                      className="text-lg transition-colors hover:opacity-70"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
                    >
                      {product.name}
                    </h3>
                  </Link>
                  <p
                    className="text-sm line-clamp-2"
                    style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
                  >
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <p
                      className="font-medium"
                      style={{ fontFamily: "'Inter', sans-serif", color: colors.charcoal }}
                    >
                      {product.price}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" style={{ color: colors.gold }} />
                      <span
                        className="text-sm"
                        style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
                      >
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="px-12 py-6 text-sm tracking-widest uppercase"
              style={{
                borderColor: colors.charcoal,
                color: colors.charcoal,
                fontFamily: "'Inter', sans-serif",
                backgroundColor: "transparent"
              }}
            >
              <Link href="/shop">
                View All Products
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Centered */}
      <section id="about" className="py-20 lg:py-32" style={{ backgroundColor: colors.sage }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: "'Inter', sans-serif", color: colors.gold }}
          >
            Our Philosophy
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl mb-8 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
          >
            Connecting creators and collectors through meaningful craft
          </h2>
          <div
            className="w-16 h-px mx-auto mb-8"
            style={{ backgroundColor: colors.gold }}
          />
          <p
            className="text-lg lg:text-xl leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
          >
            Artisan Collective is a curated marketplace where independent jewelry makers share their
            craft directly with those who appreciate authentic, handmade beauty. We verify every
            artisan, ensure ethical sourcing, and provide certificates of authenticity with each
            piece. When you purchase here, you are not just buying jewelry but investing in a
            story, supporting a maker, and owning something truly unique.
          </p>

          {/* How It Works */}
          <div className="grid sm:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.cream }}
              >
                <Search className="w-8 h-8" style={{ color: colors.gold }} />
              </div>
              <h3
                className="text-xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
              >
                Discover
              </h3>
              <p
                className="text-sm"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
              >
                Browse our curated selection of handmade pieces from verified artisans worldwide
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.cream }}
              >
                <Sparkles className="w-8 h-8" style={{ color: colors.gold }} />
              </div>
              <h3
                className="text-xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
              >
                Customize
              </h3>
              <p
                className="text-sm"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
              >
                Request engravings, size adjustments, or work with makers on bespoke creations
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.cream }}
              >
                <Award className="w-8 h-8" style={{ color: colors.gold }} />
              </div>
              <h3
                className="text-xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
              >
                Receive
              </h3>
              <p
                className="text-sm"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
              >
                Every piece arrives with an authenticity certificate and maker story card
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section
        className="py-16"
        style={{
          background: `linear-gradient(135deg, ${colors.charcoal} 0%, #2a2a2a 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
              >
                <p
                  className="text-4xl lg:text-5xl mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.gold }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-sm tracking-wider uppercase"
                  style={{ fontFamily: "'Inter', sans-serif", color: colors.cream }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section id="story" className="py-20 lg:py-32" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p
              className="text-sm tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Inter', sans-serif", color: colors.gold }}
            >
              Customer Stories
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
            >
              Words from Our Community
            </h2>
            <div
              className="w-16 h-px mx-auto"
              style={{ backgroundColor: colors.gold }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-8 border-0"
                style={{ backgroundColor: colors.sage }}
              >
                <Quote className="w-8 h-8 mb-4" style={{ color: colors.gold, opacity: 0.5 }} />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: colors.gold }}
                    />
                  ))}
                </div>
                <p
                  className="text-lg mb-6 leading-relaxed italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div
                  className="pt-4 border-t"
                  style={{ borderColor: `${colors.stone}20` }}
                >
                  <p
                    className="font-medium"
                    style={{ fontFamily: "'Inter', sans-serif", color: colors.charcoal }}
                  >
                    {testimonial.author}
                  </p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
                  >
                    {testimonial.location} · {testimonial.product}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Strip */}
      <section className="py-16" style={{ backgroundColor: colors.sage }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {submitSuccess ? (
            <div className="py-8">
              <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: colors.gold }} />
              <h3
                className="text-2xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
              >
                Welcome to the Collective
              </h3>
              <p
                className="text-sm"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
              >
                Thank you for subscribing. Check your inbox for a special welcome offer.
              </p>
            </div>
          ) : (
            <>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}
              >
                Join the Artisan Collective
              </h2>
              <p
                className="text-sm mb-8"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
              >
                Subscribe for early access to new collections, artisan stories, and exclusive offers
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 border-0"
                  style={{
                    backgroundColor: colors.cream,
                    fontFamily: "'Inter', sans-serif",
                    color: colors.charcoal
                  }}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 text-sm tracking-widest uppercase whitespace-nowrap"
                  style={{
                    backgroundColor: colors.charcoal,
                    color: colors.cream,
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
              {submitError && (
                <p
                  className="text-sm mt-4"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#b91c1c" }}
                >
                  {submitError}
                </p>
              )}
              <p
                className="text-xs mt-4"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
              >
                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Footer Full */}
      <footer style={{ backgroundColor: colors.charcoal }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <Gem className="w-8 h-8" style={{ color: colors.gold }} />
                <span
                  className="text-2xl tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.cream }}
                >
                  Artisan Collective
                </span>
              </Link>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
              >
                A curated marketplace connecting independent jewelry makers with collectors who
                appreciate authentic, handmade beauty.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-colors hover:opacity-70"
                  style={{ backgroundColor: `${colors.stone}30`, color: colors.cream }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-colors hover:opacity-70"
                  style={{ backgroundColor: `${colors.stone}30`, color: colors.cream }}
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-colors hover:opacity-70"
                  style={{ backgroundColor: `${colors.stone}30`, color: colors.cream }}
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Shop Column */}
            <div>
              <h4
                className="text-sm tracking-widest uppercase mb-6"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.gold }}
              >
                Shop
              </h4>
              <ul className="space-y-3">
                {["All Jewelry", "Rings", "Necklaces", "Earrings", "Bracelets", "New Arrivals"].map((item) => (
                  <li key={item}>
                    <Link
                      href="/shop"
                      className="text-sm transition-colors hover:opacity-70"
                      style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4
                className="text-sm tracking-widest uppercase mb-6"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.gold }}
              >
                Company
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Our Story", href: "#about" },
                  { label: "Artisan Directory", href: "/artisans" },
                  { label: "Become a Seller", href: "/seller" },
                  { label: "Sustainability", href: "/sustainability" },
                  { label: "Press", href: "/press" }
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors hover:opacity-70"
                      style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4
                className="text-sm tracking-widest uppercase mb-6"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.gold }}
              >
                Support
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Contact Us", href: "mailto:hello@artisancollective.com" },
                  { label: "FAQs", href: "/faq" },
                  { label: "Shipping & Returns", href: "/shipping" },
                  { label: "Ring Size Guide", href: "/size-guide" },
                  { label: "Care Instructions", href: "/care" }
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors hover:opacity-70"
                      style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-2">
                <a
                  href="mailto:hello@artisancollective.com"
                  className="flex items-center gap-2 text-sm transition-colors hover:opacity-70"
                  style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
                >
                  <Mail className="w-4 h-4" style={{ color: colors.gold }} />
                  hello@artisancollective.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{ borderColor: `${colors.stone}30` }}
          >
            <p
              className="text-xs"
              style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
            >
              © {new Date().getFullYear()} Artisan Collective. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-xs transition-colors hover:opacity-70"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs transition-colors hover:opacity-70"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-xs transition-colors hover:opacity-70"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.stone }}
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}