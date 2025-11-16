import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  SerializeOptions,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { Testimonial } from './domain/testimonial';
import { NullableType } from '../utils/types/nullable.type';

@ApiTags('Testimonials')
@Controller({
  path: 'testimonials',
  version: '1',
})
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @ApiCreatedResponse({
    type: Testimonial,
  })
  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTestimonialDto: CreateTestimonialDto): Promise<Testimonial> {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @ApiOkResponse({
    type: [Testimonial],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const currentPage = parseInt(page || '1', 10);
    const currentLimit = parseInt(limit || '10', 10);

    return this.testimonialsService.findAllWithPagination({
      page: currentPage,
      limit: currentLimit > 50 ? 50 : currentLimit,
    });
  }

  @ApiOkResponse({
    type: [Testimonial],
  })
  @Get('active')
  @HttpCode(HttpStatus.OK)
  findAllActive() {
    return this.testimonialsService.findAllActive();
  }

  @ApiOkResponse({
    type: Testimonial,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string): Promise<NullableType<Testimonial>> {
    return this.testimonialsService.findOne(+id);
  }

  @ApiOkResponse({
    type: Testimonial,
  })
  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ): Promise<Testimonial | null> {
    return this.testimonialsService.update(+id, updateTestimonialDto);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.testimonialsService.remove(+id);
  }
}
