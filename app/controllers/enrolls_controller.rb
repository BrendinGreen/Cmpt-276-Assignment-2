class EnrollsController < ApplicationController
  before_action :set_enroll, only: [:show, :edit, :update, :destroy]

  # GET /enrolls
  # GET /enrolls.json
  def index
    @enrolls = Enroll.all
  end

  # GET /enrolls/1
  # GET /enrolls/1.json
  def show
  end

  # GET /enrolls/new
  def new
    @enroll = Enroll.new
  end

  # GET /enrolls/1/edit
  def edit
  end

  # POST /enrolls
  # POST /enrolls.json
  def create
    params = {:course     => Course.find(enroll_params[:course].to_i),
              :student    => Student.find(enroll_params[:student].to_i),
              :percentage => enroll_params[:percentage] }
    @enroll = Enroll.new(params)
    respond_to do |format|
      if @enroll.save
        format.html { redirect_to @enroll, notice: 'Enroll was successfully created.' }
        format.json { render :show, status: :created, location: @enroll }
      else
        format.html { render :new }
        format.json { render json: @enroll.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /enrolls/1
  # PATCH/PUT /enrolls/1.json
  def update
    respond_to do |format|
      params = {:course     => Course.find(enroll_params[:course].to_i),
                :student    => Student.find(enroll_params[:student].to_i),
                :percentage => enroll_params[:percentage],
                :lettergrade => (enroll_params[:lettergrade]) ? enroll_params[:lettergrade] : nil }
      if @enroll.update(params)
        format.html { redirect_to courses_url, notice: 'Enroll was successfully updated.' }
        format.json { render :show, status: :ok, location: @enroll }
      else
        format.html { render :edit }
        format.json { render json: @enroll.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /enrolls/1
  # DELETE /enrolls/1.json
  def destroy
    @enroll.destroy
    respond_to do |format|
      format.html { redirect_to enrolls_url, notice: 'Enroll was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_enroll
      @enroll = Enroll.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def enroll_params
      params.require(:enroll).permit(:percentage, :lettergrade, :student, :course)
    end
end
