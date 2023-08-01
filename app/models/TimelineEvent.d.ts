interface TimelineEvent {
  name: String
  slug: String
  date: string
  image: string
  links: TimelineLink[]
  network: string
  type: "event"
}
