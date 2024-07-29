import {Component} from 'react'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'

import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'
import VideoItem from '../VideoItem'
import FailureView from '../FailureView'

import {
  HomeContainer,
  SidebarAndHomeContainer,
  BannerContainer,
  LeftPart,
  BannerImage,
  BannerText,
  BannerButton,
  BannerCloseButton,
  BannerRight,
  BannerAndHomeContainer,
  SearchAndHomeContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  HomeVideosContainer,
  NoSearchResultsViewContainer,
  NoSearchResultsViewImage,
  NoSearchResultsViewHeading,
  NoSearchResultsViewDescription,
  NoSearchResultsViewButton,
} from './styledComponents'
import LoadingView from '../LoadingView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    display: 'flex',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    homeVideos: [],
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const sessionId = Cookies.get('session_id') // Get session_id from cookies

    const {searchInput} = this.state

    const apiUrl = `https://cookie-backend-oymq.onrender.com/all?search=${searchInput}`
    // const apiUrl = `http://localhost:3019/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'session-id': sessionId,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhZ2FyIiwiaWF0IjoxNzIyMjcxNDkwfQ.rckv8JYpcmlJf9Nhg8EA5_icCFhyKfgAcKA7MhJdRtE`,
      },
      credentials: 'include', // Ensure cookies are included in the request
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
        publishedAt: eachVideo.published_at,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        homeVideos: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickDisplay = () => {
    this.setState({display: 'none'})
  }

  displayBanner = () => {
    const {display} = this.state
    return (
      <BannerContainer data-testid="banner" display={display}>
        <LeftPart>
          <BannerImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <BannerText>Buy Nxt Watch Premium</BannerText>
          <BannerButton type="button">GET IT NOW</BannerButton>
        </LeftPart>
        <BannerRight>
          <BannerCloseButton
            type="button"
            data-testid="close"
            onClick={this.onClickDisplay}
          >
            <AiOutlineClose size={20} />
          </BannerCloseButton>
        </BannerRight>
      </BannerContainer>
    )
  }

  onUpdateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickRetry = () => {
    this.getHomeVideos()
  }

  displayNoSearchResultsView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <NoSearchResultsViewContainer>
            <NoSearchResultsViewImage
              alt="no videos"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            />
            <NoSearchResultsViewHeading isDarkTheme={isDarkTheme}>
              No Search results found
            </NoSearchResultsViewHeading>
            <NoSearchResultsViewDescription isDarkTheme={isDarkTheme}>
              Try different key words or remove search filter
            </NoSearchResultsViewDescription>
            <NoSearchResultsViewButton
              onClick={this.onClickRetry}
              type="button"
            >
              Retry
            </NoSearchResultsViewButton>
          </NoSearchResultsViewContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  displayHomeVideosView = () => {
    const {homeVideos} = this.state
    const lengthOfVideos = homeVideos.length
    const shouldShowVideosView = lengthOfVideos > 0
    return shouldShowVideosView ? (
      <HomeVideosContainer>
        {homeVideos.map(eachVideo => (
          <VideoItem key={eachVideo.id} videoDetails={eachVideo} />
        ))}
      </HomeVideosContainer>
    ) : (
      this.displayNoSearchResultsView()
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.displayHomeVideosView()
      case apiStatusConstants.failure:
        return <FailureView onClickRetry={this.onClickRetry} />
      case apiStatusConstants.inProgress:
        return <LoadingView />
      default:
        return null
    }
  }

  onClickSearchIcon = () => {
    this.getHomeVideos()
  }

  render() {
    const {searchInput} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <HomeContainer isDarkTheme={isDarkTheme}>
              <Header />
              <SidebarAndHomeContainer>
                <Sidebar />
                <BannerAndHomeContainer>
                  {this.displayBanner()}
                  <SearchAndHomeContainer>
                    <SearchContainer>
                      <SearchInput
                        value={searchInput}
                        onChange={this.onUpdateSearchInput}
                        type="search"
                        placeholder="Search"
                      />
                      <SearchButton
                        onClick={this.onClickSearchIcon}
                        data-testid="searchButton"
                        type="button"
                      >
                        <AiOutlineSearch size={20} />
                      </SearchButton>
                    </SearchContainer>
                    {this.renderApiStatus()}
                  </SearchAndHomeContainer>
                </BannerAndHomeContainer>
              </SidebarAndHomeContainer>
            </HomeContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
