/**
 * ALL site imagery in one place.
 *
 * - `/images/...` = SPADES' own photos (studio, signboard, reels).
 * - `unsplash(...)` = free-licence placeholder photos from Unsplash (https://unsplash.com/license) — commercial use
 *   allowed, no attribution required. They are NOT presented as SPADES' work. Replace each one with the client's own
 *   photo when available: put the file in /public/images/... and change the line below to its path.
 */
const unsplash = (id: string, w = 2000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  // hero & mood
  hero: unsplash("1711513503808-53380d724182", 2400), // glossy red sedan in a bright detailing studio
  heroAlt: unsplash("1711512972691-9f8bc93fc716", 2000), // white sports car, studio
  garage: unsplash("1567808291548-fc3ee04dbcf0", 2000), // car under strip lights

  // services
  foamWash: unsplash("1608506375591-b90e1f955e4b"), // snow foam being sprayed onto a sports car
  foamWash2: unsplash("1633014041037-f5446fb4ce99"), // grey car covered in foam
  foamRed: unsplash("1697252312641-561fba5494c8"), // red car covered in foam
  polishing: unsplash("1780558852670-3f49298ecc1f"), // orbital polisher on a blue bonnet
  polisherClose: unsplash("1632823469901-5d2cfff5ba50"), // polisher close-up
  waxing: unsplash("1708805282706-f44730b7e527"), // waxing a black car in a garage
  waxHand: unsplash("1632823469850-2f77dd9c7f93"), // hand waxing a bonnet
  beading: unsplash("1780586585338-c56fe47b49f4"), // water beading on metallic paint
  beadingDark: unsplash("1550565076-b2371ea1a324"), // beads on dark paint
  interior: unsplash("1649136378672-b965cb9935d5"), // tan leather interior
  interiorDark: unsplash("1605437241278-c1806d14a4d9"), // black quilted leather seats
  dashboard: unsplash("1771491237218-cbd4a707497e"), // detailer cleaning a dashboard
  lift: unsplash("1791425318454-bd945c35c8af"), // sports car on a hydraulic lift in a studio
  headlight: unsplash("1763313299304-606adcbcc965"), // illuminated LED headlight
  tyre: unsplash("1708805282683-50a060eba80f"), // brushing a tyre
  wheel: unsplash("1565689876697-e467b6c54da2"), // wheel being washed
  splash: unsplash("1520340356584-f9917d1eea6f"), // rinse spray on a black car
  redRear: unsplash("1508974239320-0a029497e820"), // red sports car
  grille: unsplash("1711512972476-cf52b296faff"), // close-up of a black grille

  // SPADES' own photos
  studio: "/images/about/studio.jpg",
  studioHex: "/images/gallery/studio-hex-lights.jpg",
  studioLed: "/images/gallery/studio-led-bay.jpg",
  og: "/images/og.jpg",
} as const;
