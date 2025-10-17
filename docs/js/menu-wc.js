'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tempname documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/App.html" data-type="entity-link" >App</a>
                            </li>
                            <li class="link">
                                <a href="components/ChipCloudComponent.html" data-type="entity-link" >ChipCloudComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactFormComponent.html" data-type="entity-link" >ContactFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExperienceComponent.html" data-type="entity-link" >ExperienceComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExperienceTimelineComponent.html" data-type="entity-link" >ExperienceTimelineComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeAboutSectionComponent.html" data-type="entity-link" >HomeAboutSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeContactSectionComponent.html" data-type="entity-link" >HomeContactSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeExperienceSectionComponent.html" data-type="entity-link" >HomeExperienceSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeProjectsSectionComponent.html" data-type="entity-link" >HomeProjectsSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeSidebarComponent.html" data-type="entity-link" >HomeSidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LinkButtonComponent.html" data-type="entity-link" >LinkButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProjectCardComponent.html" data-type="entity-link" >ProjectCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProjectsComponent.html" data-type="entity-link" >ProjectsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProjectsFilterComponent.html" data-type="entity-link" >ProjectsFilterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResumeComponent.html" data-type="entity-link" >ResumeComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IntersectionObserverService.html" data-type="entity-link" >IntersectionObserverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationService.html" data-type="entity-link" >NavigationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScrollService.html" data-type="entity-link" >ScrollService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ContactFormPayload.html" data-type="entity-link" >ContactFormPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EducationItem.html" data-type="entity-link" >EducationItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExperienceItem.html" data-type="entity-link" >ExperienceItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExperienceItem-1.html" data-type="entity-link" >ExperienceItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavSection.html" data-type="entity-link" >NavSection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Profile.html" data-type="entity-link" >Profile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProfileLinks.html" data-type="entity-link" >ProfileLinks</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProjectCard.html" data-type="entity-link" >ProjectCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProjectSummary.html" data-type="entity-link" >ProjectSummary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SkillHighlight.html" data-type="entity-link" >SkillHighlight</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});