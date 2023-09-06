interface TimelineLink {
  /**
   * corresponds to linkTypes.name in taxonomy.json
   * @example "Twitter"
   */
  type: string
  /**
   * Will be used as the link text if defined,
   * Otherwise, the type name will be used
   * @example "Official Website"
   */
  name?: string
  url: string
}
