# Design Guidelines: BankRight

## Design Approach

**Selected Framework:** Design System Approach - Material Design 3
**Rationale:** This is a utility-focused, information-dense application where trust, clarity, and efficiency are paramount. The banking/regulatory context demands a professional, accessible design that prioritizes content hierarchy and usability over visual flair.

**Design Principles:**
1. **Trust & Credibility:** Clean, professional aesthetic that conveys authority
2. **Information Clarity:** Strong typographic hierarchy for dense regulatory content
3. **Accessibility First:** Multi-language support with clear navigation patterns
4. **Task Efficiency:** Streamlined flows for finding circulars and generating emails

---

## Typography System

**Font Families:** 
- Primary: Inter (headings, UI elements, English content)
- Secondary: Noto Sans Devanagari (Hindi, Marathi script support)
- Tertiary: Noto Sans Kannada (Kannada script support)

**Hierarchy:**
- H1 (Page Titles): text-4xl md:text-5xl, font-bold
- H2 (Section Headers): text-3xl md:text-4xl, font-semibold
- H3 (Subsections): text-2xl, font-semibold
- H4 (Card Titles): text-xl, font-medium
- Body Large: text-lg (circular summaries, important notices)
- Body: text-base (general content)
- Small: text-sm (metadata, dates, supporting info)
- Caption: text-xs (footnotes, legal text)

---

## Layout System

**Spacing Scale:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistency
- Component padding: p-4 to p-6
- Section spacing: py-12 to py-20
- Card gaps: gap-4 to gap-6
- Container margins: mx-4 to mx-8

**Grid System:**
- Desktop: max-w-7xl container with px-8
- Content areas: max-w-4xl for readable text blocks
- Dashboard grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

---

## Component Library

### Navigation
**Header:** Sticky top navigation with:
- Platform logo/branding (left)
- Primary navigation links: Circulars | Issue Guide | Email Templates | Banks Directory
- Language selector dropdown (right) with flags/script indicators
- Mobile: Hamburger menu with slide-out drawer

**Footer:** Three-column layout containing:
- Quick links (About, How to Use, FAQs)
- Contact information
- Legal disclaimers and data sources
- Language selector (redundant for accessibility)

### Core Components

**Circular Cards:**
- Elevated card design with subtle shadow
- Header: Circular number, issuing authority, date (text-sm)
- Title: Bold, text-lg, 2-line truncation
- Summary: text-base, 4-line preview with "Read more" expansion
- Tags: Category pills (RBI, SEBI, Banking Ombudsman)
- Action: "View Full Circular" button

**Issue Resolution Wizard:**
- Multi-step flow with progress indicator at top
- Step 1: Category selection grid (6-8 large icon cards)
- Step 2: Specific issue selection (radio buttons with descriptions)
- Step 3: Step-by-step guidance (numbered list with clear typography)
- Step 4: Email template preview and customization

**Email Template Generator:**
- Split view: Form inputs (left) | Live preview (right)
- Form fields: Issue type, bank name, account details, incident description
- Template preview: Formatted email with proper structure
- Actions: Copy to clipboard, Download as text, Send directly (if email integration)

**Bank Directory Table:**
- Sortable columns: Bank Name, Customer Care Email, Phone, Website
- Search bar with instant filtering
- Alphabetical grouping headers
- Click-to-copy functionality for email addresses

### Forms & Inputs
- Outlined text fields with floating labels
- Dropdown selects with clear chevron indicators
- Radio buttons with descriptive labels and helper text
- Large touch targets (min-h-12) for mobile accessibility
- Form validation with inline error messages (text-sm, below field)

### Data Display
**Filters Panel:**
- Left sidebar (desktop) or collapsible drawer (mobile)
- Checkbox groups for categories
- Date range picker for circulars
- "Clear all filters" link

**Search Bar:**
- Prominent placement with magnifying glass icon
- Placeholder text adapts to language selection
- Search suggestions dropdown for common queries

### Overlays
**Modal Dialogs:**
- For full circular view, detailed guidance steps
- Max-width: max-w-3xl
- Backdrop blur with semi-transparent overlay
- Close button (top-right) and ESC key support

**Toast Notifications:**
- Bottom-right positioning
- Success, info, warning variants
- Auto-dismiss after 5 seconds
- Icon + message + dismiss button

---

## Page Layouts

### Homepage/Dashboard
- Hero section (h-64): Platform introduction with value proposition
- Quick stats banner: Total circulars, languages supported, banks covered (3-column grid)
- Recent circulars section: Grid of 6 latest circular cards
- Popular issues section: 4-6 icon cards linking to common problem categories
- CTA sections: "Browse all circulars", "Find solution to your issue"

### Circulars Page
- Filter sidebar (1/4 width, sticky)
- Main content (3/4 width): Search bar + circular cards grid
- Pagination at bottom
- Sort options: Newest first, Relevance, Category

### Issue Guide Page
- Category selection grid (initial view): 3x3 cards with icons
- Selected category view: List of specific issues with brief descriptions
- Issue detail view: Step-by-step numbered guidance with expandable sections

### Email Templates Page
- Template builder form with bank selection dropdown
- Issue type selection
- Custom fields for personalization
- Generated email preview card
- Bank contact info display

### Banks Directory
- Searchable, sortable table
- Quick filters: Public, Private, Cooperative, Foreign
- Detailed bank card on selection with all contact methods

---

## Images

**Hero Image:**
- Placement: Homepage hero section background
- Description: Professional banking imagery - modern bank building facade or digital banking illustration with Indian architectural elements, subtle and trustworthy
- Treatment: Overlay gradient for text readability, subtle blur or 40% opacity

**Category Icons:**
- Issue categories (Account issues, Loan disputes, Card problems, etc.)
- Use Heroicons or Material Icons for consistency
- Size: w-12 h-12 to w-16 h-16 depending on context

**Illustration Usage:**
- Empty states: "No circulars found" with magnifying glass illustration
- Success states: Checkmark illustration when email template generated
- Error states: Friendly warning icon for form validation

---

## Accessibility & Multi-language

**Language Switching:**
- Instant content reload on language change
- Preserve user's filter/search state
- RTL support not required (all supported scripts are LTR)
- Font-size adjustments for Devanagari scripts (slightly larger for readability)

**Keyboard Navigation:**
- All interactive elements accessible via Tab
- Skip to main content link
- Focus indicators with visible outlines
- Arrow key navigation in dropdowns and wizards

**Screen Reader Support:**
- ARIA labels for icon-only buttons
- Live region announcements for filter updates
- Descriptive link text (avoid "Click here")

---

## Animations

Use sparingly and purposefully:
- Page transitions: Simple fade-in for content loading
- Card hover: Subtle elevation increase (shadow transition)
- Accordion expand/collapse: Smooth height animation
- No parallax, no complex scroll-triggered effects