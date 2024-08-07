<?php

class Brizy_Editor_API_Client extends Brizy_Editor_Http_Client
{

    /**
     * @var Brizy_Editor_API_AccessToken
     */
    private $access_token;

    /**
     * Brizy_Editor_API_Client constructor.
     *
     * @param $token
     */
    public function __construct($token)
    {
        parent::__construct();
        $this->access_token = $token;
    }

    public function getUser()
    {
        return $this->post('users/me', array())->get_response_body();
    }

    /**
     * @param null $clone_from_id
     *
     * @return array|mixed|object
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
    public function create_project($clone_from_id = null)
    {

        $project   = new Brizy_Editor_API_Project(array());
        $save_data = $project->getSaveData();

        if ($clone_from_id) {
            $save_data['resource_id_clonable'] = $clone_from_id;
        }

        return $this->post('projects', array('body' => $save_data))->get_response_body();
    }

    /**
     * @param $page_ids
     * @param $project_target
     *
     * @return array|mixed|object
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
//	public function clone_pages( $page_ids, $project_target ) {
//
//		return $this->post( 'pages/clones', array(
//			'body' => array(
//				'project' => $project_target,
//				'pages'   => $page_ids
//			)
//		) )->get_response_body();
//	}

    /**
     * @param Brizy_Editor_API_Project $project
     *
     * @return array|mixed|object
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
    public function get_project(Brizy_Editor_API_Project $project)
    {

        return $this->get("projects/{$project->get_id()}")->get_response_body();
    }

    /**
     * @param Brizy_Editor_API_Project $project
     *
     * @return array|mixed|object
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
    public function update_project(Brizy_Editor_API_Project $project)
    {
        return $this->put(
            "projects/{$project->get_id()}",
            array('body' => $project->getSaveData('PUT'))
        )->get_response_body();
    }

    /**
     * @param $id
     *
     * @return array|mixed|object
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
    public function delete_project($id)
    {
        return $this->delete("projects/$id")->get_response_body();
    }

    /**
     * @param $project_id
     *
     * @return array|mixed|object
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
//	public function get_pages( $project_id ) {
//		return $this->get( "projects/$project_id/pages?=signature=" . Brizy_Editor_Signature::get() )->get_response_body();
//	}

    /**
     * @param $project_id
     * @param $page_id
     *
     * @return array|mixed|object
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
//	public function get_page( $project_id, $page_id ) {
//		return $this->get( "projects/$project_id/pages/$page_id" )->get_response_body();
//	}

    /**
     * @param $project_id
     * @param Brizy_Editor_API_Page $page
     *
     * @return array|mixed|object
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
//	public function create_page( $project_id, Brizy_Editor_API_Page $page ) {
//		return $this->post( "projects/$project_id/pages", array( 'body' => $page->getSaveData() ) )->get_response_body();
//	}

    /**
     * @param $project_id
     * @param $page_id
     * @param Brizy_Editor_API_Page $page
     *
     * @return array|mixed|object
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
//	public function update_page( $project_id, $page_id, Brizy_Editor_API_Page $page ) {
//		return $this->put( "projects/$project_id/pages/$page_id", array( 'body' => $page->getSaveData( 'PUT' ) ) )->get_response_body();
//	}

    /**
     * @param $project_id
     * @param $page_id
     *
     * @return array|mixed|object
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
//	public function delete_page( $project_id, $page_id ) {
//		return $this->delete( "projects/$project_id/pages/$page_id" )->get_response_body();
//	}

    /**
     * @param $project_id
     * @param $base64
     *
     * @return array|mixed|object
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
    public function add_media($project_id, $base64)
    {
        return $this->post(
            "projects/$project_id/media",
            array(
                'timeout' => 30,
                'body'    => array('attachment' => $base64),
            )
        )->get_response_body();
    }

    /**
     * @return array
     */
    protected function get_headers()
    {
        return array(//'Authorization' => 'Bearer ' . $this->access_token->access_token()
        );
    }

    /**
     * @param $suffix
     *
     * @return string
     */
    protected function url($suffix)
    {
        $implode = rtrim(implode("/", array(Brizy_Config::GATEWAY_URI, 'v1', $suffix)), "/");

        return $implode;
    }

    /**
     * @param $url
     * @param array $options
     * @param string $method
     *
     * @return Brizy_Editor_Http_Response
     * @throws Brizy_Editor_API_Exceptions_Exception
     * @throws Brizy_Editor_Http_Exceptions_BadRequest
     * @throws Brizy_Editor_Http_Exceptions_ResponseException
     * @throws Brizy_Editor_Http_Exceptions_ResponseNotFound
     * @throws Brizy_Editor_Http_Exceptions_ResponseUnauthorized
     */
    public function request($url, $options = array(), $method = 'GET')
    {
        return parent::request(
            $this->url($url),
            $options,
            $method
        );
    }

    /**
     * @param $options
     *
     * @return array
     */
    protected function prepare_options($options)
    {

        $options = parent::prepare_options($options);

        $options['headers'] = array_merge($options['headers'], $this->get_headers());

        return $options;
    }

    protected function get_project_json(Brizy_Editor_Project $project)
    {
        return json_encode(
            array(
                'id'   => $project->getId(),
                'data' => $project->getDataAsJson(),
            )
        );
    }
}
