Task 1
In independent module implement directive onlyForScreen that renders element when width of the screen is in certain range. Browser width can change after application starts up.

Service that tracks current browser width should receive configuration during initialization with threshold values (lowest value from which device starts).

Example of usage:

<span *onlyForScreen="'desktop'">shown on big screens</span>
<span *onlyForScreen="'tablet'">shown on tablet screens</span>
<span *onlyForScreen="'mobile'">shown on small screens</span>
Please take performance into consideration (page can have hundreds of elements that use this directive).

interface IConfig {
  mobile: number;
  tablet: number;
}

mobile: viewportWidth < config.mobile
tablet: config.mobile <= viewportWidth < config.tablet
desktop: config.tablet <= viewportWidth
Submission should include sandbox app with usage examples of this directive.